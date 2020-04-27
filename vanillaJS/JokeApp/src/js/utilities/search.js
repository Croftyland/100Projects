//filtering function
import { createJoke } from './request';

document.querySelector(".category__item--button").addEventListener("click", searchRequest)
const link = 'https://api.chucknorris.io/jokes/random?query=';

const url = 'https://api.chucknorris.io/jokes/search?query=hello';

const searchRequest = () =>
  fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
      let jokes = data.result;
      return jokes.map(function(joke) {
        console.log(joke);
        createJoke(joke);
      })
    })
    .catch(function(error) {
    console.log(JSON.stringify(error));
  });


export {searchRequest}
