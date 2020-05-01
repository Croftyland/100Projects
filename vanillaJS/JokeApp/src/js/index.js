import '../style/styles.css';

import chuck from '../img/chuck.png';

import { renderReq, obj, giveAsign, jokeCard } from './utilities/request';
import { controlSearch } from './utilities/search';
import { valueCat } from './utilities/caregory';

let getQuote = obj;

const fetchRandom = 'https://api.chucknorris.io/jokes/random';

document.getElementById('chuck').src = chuck;

let displayRadioValue = (function(target) {
  let init = function() {
    target.onclick = function(e) {
      if (e.target.type == 'radio') {
        let matchingInput = target.querySelector(`[data-value=${ e.target.value }]`);
        switchToInput(matchingInput);
        if (e.target.value === 'random') {
          renderReq(fetchRandom);
        } else if (e.target.value === 'categories') {
          renderButtons(e.target)
        } else if (e.target.value === 'search') {
          handleSearch();
        }
      }
      giveAsign(getQuote,jokeCard);
    };
  };


  function renderButtons(el) {
    el.closest('.category__input').nextElementSibling.classList.add('visible');
    document.getElementById('categories').addEventListener('click', (e) => {
      e.preventDefault();
      valueCat(e.target.dataset.value);
    });
  }

  function handleSearch() {
    document.getElementById('category__search').addEventListener('submit', (e) => {
      e.preventDefault();
      controlSearch()
    });
  }

  let switchToInput = function(input) {
    let classInputs = target.querySelectorAll('.category__item--inner');
    [].forEach.call(classInputs, function(input) {
      input.classList.remove('visible');
    });
    input.classList.add('visible');
  };


  return {
    init: init
  };
})(document.querySelector('.js-category'));

displayRadioValue.init();
