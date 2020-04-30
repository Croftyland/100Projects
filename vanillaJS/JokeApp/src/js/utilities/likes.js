import { obj } from './request';

const el = {
  favouriteList: document.querySelector('.favourite__list')
};

const controlFavourite = (quoteId, obj) => {
  const currQuote = obj.find((quote) => quote.id === quoteId);
  currQuote.isLiked = !currQuote.isLiked;
  if (currQuote.isLiked) {
    renderLike(currQuote)
  } else {
    deleteLike(currQuote.id);

  }

};

const renderLike = fav => {
  const markup = `
           <li>
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
};

const deleteLike = id => {
  const el = document.querySelector(`.card[data-id="${id}"]`).parentElement;
  console.log(el);
  if (el) el.parentElement.removeChild(el);
}

export { controlFavourite };
