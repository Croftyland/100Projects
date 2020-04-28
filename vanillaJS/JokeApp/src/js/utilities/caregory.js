import { request } from './request';

const controlCategory = () => {
  let clickedValue;
  const buttons = document.querySelectorAll('.tag');
  [...buttons].forEach(item => {
    item.addEventListener('click', event => {
      clickedValue = item.value;
      value(clickedValue);
    });
  })
};

const value = (cat) => {
  const url = `https://api.chucknorris.io/jokes/random?category=${cat}`;
  request(url);
};

export { controlCategory }
