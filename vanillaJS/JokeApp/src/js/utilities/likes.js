import { obj } from './request';

const el = {
  favouriteList: document.querySelector('.favourite__list'),
  favouriteButton: document.querySelector('.card__headerBtn')
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
  const calculate = function() {
    let previously = new Date(fav.updated_at);
    let now = Date.now();
    let msPerMinute = 60 * 1000;
    let msPerHour = msPerMinute * 60;

    let elapsed = now - previously;

    return Math.round(elapsed / msPerHour) + ' hours ago';
  };
  const markup = `
           <li class ="card_fav">
               <div data-id=${fav.id} class="card card__mini">
                    <div class ="card__header">
                        <button data-id=${fav.id} class="card__headerBtn card__headerBtn--favourite"></button>
                    </div>
                        <div class="card__body card__body--mini">
                            <div class="info">
                                <div class="info__id info__id--mini">
                                    ID: <a href="${fav.url}" class="info__link">${fav.id}</a>
                            <div class="info__text info__text--mini">${fav.value}</div>
                    </div>
                    </div>
                        <div class="card__footer">
                            <div class="update update--mini">Last update <time>${calculate()}</time></div>
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
  const el = document.querySelector(`.card[data-id="${id}"]`).parentElement;
  const but = document.querySelector(` .container .card__headerBtn[data-id="${id}"]`);
  if (but) {
    but.classList.remove('card__headerBtn--favourite')
    console.log(but);
  }
  if (el) {
    el.parentElement.removeChild(el);

  }
  items.forEach((item, index) => {
    if (item.id === id) {
      items.splice(index, 1);
      localStorage.setItem('dataFav', JSON.stringify(items));
    }
  });
};

export { controlFavourite, items };
