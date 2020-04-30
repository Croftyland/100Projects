import axios from 'axios';
import { giveAsign, obj } from './request';

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
      giveAsign(obj.search.result);
  }
};

const getInput = () => elements.searchRequest.value;

document.querySelector('#category').addEventListener('submit', event => {
  event.preventDefault();
  if(event.keyCode === 13) {
    event.preventDefault();
    controlSearch.reset();
    return false;
  }
  controlSearch();
});

export { controlSearch }
