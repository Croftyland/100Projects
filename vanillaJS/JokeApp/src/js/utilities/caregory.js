import { renderReq } from './request';

const valueCat = (cat) => {
  const url = `https://api.chucknorris.io/jokes/random?category=${cat}`;
  renderReq(url);
};

export { valueCat }
