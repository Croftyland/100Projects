import '../style/styles.css';
import { renderReq, obj, giveAsign, jokeCard } from './utilities/request';
import { controlSearch } from './utilities/search';
import { controlCategory } from './utilities/caregory';
import { controlFavourite } from './utilities/likes';

import chuck from '../img/chuck.png';

const fetchRandom = 'https://api.chucknorris.io/jokes/random';
let getQuote = obj;



document.getElementById('chuck').src = chuck;

let displayRadioValue = (function(target) {
  let init = function() {
    target.onclick = function(e) {
      if (e.target.type == 'radio') {
        let matchingInput = target.querySelector('[data-value=' + e.target.value + ']');
        switchToInput(matchingInput);
        if (e.target.value === 'random') {
          getQuote = renderReq(fetchRandom);
        }
        if (e.target.value === 'categories') {
          controlCategory();
        }
        else(controlSearch())

      }
      giveAsign(getQuote, jokeCard);
    };
  };

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
})(document.getElementById('category'));

displayRadioValue.init();
