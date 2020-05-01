import { obj } from './request';

const el = {
  favouriteList: document.querySelector('.favourite__list')
};

let items = localStorage.getItem('dataFav') ? JSON.parse(localStorage.getItem('dataFav')) : [];
localStorage.setItem('dataFav', JSON.stringify(items));
const states = JSON.parse(localStorage.getItem('dataFav'));

const controlFavourite = (quoteId, obj) => {
  let currQuote = obj.find((quote) => quote.id === quoteId);
  if(!currQuote) return;
  currQuote.isLiked = !currQuote.isLiked;
  if (currQuote.isLiked) {
    items.push(currQuote);
    renderLike(currQuote);
  } else {
    deleteLike(currQuote.id);
  }

};

const renderLike = fav => {
  localStorage.setItem('dataFav', JSON.stringify(items));
  const markup = `
           <li class ="card_fav">
               <div data-id=${fav.id} class="card">
                    <div class ="card__header">
                        <button data-id=${fav.id} class="card__headerBtn card__headerBtn--favourite"></button>
                    </div>
                        <div class="card__body">
                            <div class="info">
                                <div class="info__id">
                                    ID: <a href="${fav.url}" class="info__link">${fav.id}</a>
                            <div class="info__text">${fav.value}</div>
                    </div>
                    </div>
                        <div class="card__footer">
                            <div class="tag tag--min">${fav.categories}</div>
                        </div>   
                    </div>
                    </div>
            </li>
         `;
  el.favouriteList.insertAdjacentHTML('beforeend', markup);
  document.querySelectorAll('.favourite__list .card__headerBtn').forEach(el => el.addEventListener('click', event => {
      controlFavourite(event.target.dataset.id, items);
    })
  );
};

states.forEach(item => {
  renderLike(item);
});

const deleteLike = id => {
  console.log(id);
  const el = document.querySelector(`.card[data-id="${id}"]`).parentElement;
  if (el) {
    el.parentElement.removeChild(el);
  }
  items.forEach((item, index) => {
    if (item.id === id) {
      items.splice(index, 1);
      console.log(item.id, index);
      localStorage.setItem('dataFav', JSON.stringify(items));
      console.log(items);
    }
  });


};

export { controlFavourite };
