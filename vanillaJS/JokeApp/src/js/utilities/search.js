import axios from 'axios';
import { giveAsign, obj } from './request';

const elements = {
  searchRequest : document.querySelector('.input'),
};

class searchRequest {
  constructor(query) {
    this.query = query;
  }

  async getRequest() {
    try {
      const res = await axios(`https://api.chucknorris.io/jokes/search?query=${this.query}`);
      return res.data.result;
    } catch (error) {
      alert(error);
    }
  }
}

const controlSearch = async () => {
  const query = getInput();
  if (query) {
    obj.search = new searchRequest(query);
    let res = await obj.search.getRequest();
      giveAsign(res);
  }
};

const getInput = () => elements.searchRequest.value;

document.querySelector('.category__item--button').addEventListener('click', event => {
  event.preventDefault();
  controlSearch();
});

export { controlSearch }
