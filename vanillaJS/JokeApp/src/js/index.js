import '../style/styles.css';
import request from './utilities/random.js';

import chuck from '../img/chuck.png';

document.getElementById('chuck').src = chuck;

var divs = ["Random", "Categories", "Search"];
var visibleDivId = null;

export function divVisibility(divId) {
	if (visibleDivId === divId) {
		visibleDivId = null;
	} else {
		visibleDivId = divId;
	}
	hideNonVisibleDivs();
}

function hideNonVisibleDivs() {
	var i, divId, div;
	for (i = 0; i < divs.length; i++) {
		divId = divs[i];
		div = document.getElementById(divId);
		if (visibleDivId === divId) {
			div.style.display = "block";
		} else {
			div.style.display = "none";
		}
	}
}

function displayRadioValue() {
	document.getElementById("result").innerHTML = "";
	var ele = document.getElementsByTagName('input');

	for (let i = 0; i < ele.length; i++) {

		if (ele[i].type === "radio") {

			if (ele[i].checked)
				document.getElementById("result").innerHTML
					+= ele[i].name + " Value: "
					+ ele[i].value + "<br>";
		}
	}
}
