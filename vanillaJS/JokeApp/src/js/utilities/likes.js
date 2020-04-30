import { obj } from './request';

document.querySelector('.container').addEventListener('click', event => {
  if (event.target.matches('.card__header, .card__headerBtn')) {
    controlFavourite(event.target.dataset.id, obj);
  }
})

const controlFavourite = (quoteId, obj) => {
  const currQuote = obj.find((quote) => quote.id === quoteId)
  currQuote.isLiked = !currQuote.isLiked;
  console.log(currQuote)

};
