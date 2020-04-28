import axios from 'axios';
import { obj, createJoke } from './request'

const elements = {
  searchRequest : document.querySelector('.input'),
  searchList : document.getElementById('joke')
};

class searchRequest {
  constructor(query) {
    this.query = query;
  }

  async getRequest() {
    try {
      const res = await axios(`https://api.chucknorris.io/jokes/search?query=${this.query}`);
      this.result = res.data.result;
    } catch (error) {
      alert(error);
    }
  }
}

const controlSearch = async () => {
  const query = getInput();
  if (query) {
    obj.search = new searchRequest(query);
    await obj.search.getRequest();
    (obj.search.result).forEach(data => {
      createJoke(data);
    });

  }
};

const getInput = () => elements.searchRequest.value;

document.querySelector('.category__item--button').addEventListener('click', event => {
  event.preventDefault();
  controlSearch();
});

export { controlSearch }
