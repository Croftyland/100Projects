import { obj } from './request';

const fav = document.getElementById('fav');

const controlFavourite = (quoteId, obj) => {
  const currQuote = obj.find((quote) => quote.id === quoteId);
  currQuote.isLiked = !currQuote.isLiked;
  console.log(currQuote.isLiked);
  if (currQuote.isLiked) {
    let itemFav = document.createElement('li');
    const markup = `
           <div class="card">
            <div class ="card__header">
                <button data-id=${currQuote.id} class="card__headerBtn ${currQuote.isLiked ? 'favouriteBtn' : ''}"></button>
            </div>
            <div class="card__body">
                <div class="info">
                    <div class="info__id">
                       ID: <a href="${currQuote.url}" class="info__link">${currQuote.id}</a>
                        <div class="info__text">${currQuote.value}</div>
                    </div>
                </div>
                    <div class="card__footer">
                    <div class="tag tag--min">${currQuote.categories}</div>
                </div>   
            </div>
       </div>
    `;
    itemFav.innerHTML = markup;
    fav.appendChild(itemFav);
  } else {
    console.log('click');
  }

};

export { controlFavourite };


