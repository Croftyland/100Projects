import { controlFavourite } from './likes';

const jokeCard = document.querySelector('#joke');

let obj = [];

async function request(url) {
  try {
    const response = await fetch(url, {
      mode: 'cors',
      method: 'GET',
      credentials: 'same-origin'
    });
    const quotes = await response.json();
    return quotes;
  } catch (error) {
    console.error(error);
  }
}

const renderReq = async (url) => {
  const quotes = await request(url);
  obj = [quotes];
  giveAsign(obj);
};

function giveAsign(data) {
  obj = data.map(quote => ({
      categories: quote.categories,
      id: quote.id,
      updated_at: quote.updated_at,
      url: quote.url,
      value: quote.value
    })
  );
  renderQuotes(obj, jokeCard);
}


const renderQuotes = (data, parent) => {
  const cardQuote = data.map((quote) => {
    const calculate = function() {
      let previously = new Date(quote.updated_at);
      let now = Date.now();
      let msPerMinute = 60 * 1000;
      let msPerHour = msPerMinute * 60;

      let elapsed = now - previously;

      return Math.round(elapsed / msPerHour) + ' hours ago';
    };
    return `<div class="card">
            <div class ="card__header">
                <button data-id=${quote.id} class="card__headerBtn"></button>
            </div>
            <div class="card__body">
                <div class="info">
                    <div class="info__id">
                       ID: <a href="${quote.url}" class="info__link">${quote.id}</a>
                        <div class="info__text">${quote.value}</div>
                    </div>
                </div>
                    <div class="card__footer">
                        <div class="update">Last update <time>${calculate()}</time></div>
                    <div class="tag tag--min">${quote.categories}</div>
                </div>   
            </div>
       </div>`;
  }).join(' ');
  parent.innerHTML = cardQuote;
  document.querySelectorAll(".container .card__headerBtn").forEach(el => el.addEventListener('click', event => {
      event.target.classList.toggle('card__headerBtn--favourite');
      controlFavourite(event.target.dataset.id, obj);
    })
  );
};

export { renderReq, obj, renderQuotes, jokeCard, giveAsign };
