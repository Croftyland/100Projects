import '../style/styles.css';
import { request } from './utilities/request';

import chuck from '../img/chuck.png';

const fetchPromise = 'https://api.chucknorris.io/jokes/random';
document.getElementById('chuck').src = chuck;

let displayRadioValue = (function (target) {
	let init = function() {
		target.onclick = function(e) {
			if (e.target.type == "radio") {
				let matchingInput = target.querySelector('[data-value="'+ e.target.value +'"]');
				switchToInput(matchingInput);
        if (e.target.value === 'random'){
          request(fetchPromise)
        };

      }
		};
	};

	let switchToInput = function(input) {
		let classInputs = target.querySelectorAll('.category__item--inner');
		[].forEach.call(classInputs, function(input) {
		  console.log(input)
			input.classList.remove("visible");
		});
			input.classList.add("visible");
	};


	return {
		init: init
	};
})(document.getElementById("category"));

displayRadioValue.init();
