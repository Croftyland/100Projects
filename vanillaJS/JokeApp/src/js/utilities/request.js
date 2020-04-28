const jokeCard = document.querySelector('.container');

let obj = {};

const request = (fetchPromise) =>
  fetch(fetchPromise)
    .then(response => {
      return response.json();
    })
    .then(data => obj = data)
    .then(() => createJoke(obj));



const createJoke = (obj) => {
  let fragment = document.createDocumentFragment();
  let joke = document.createElement('div');
  joke.classList.add('container');

  let render = function(template, node) {
    node.innerHTML += template;
  };

  const calculate = function() {
    let previously = new Date(obj.updated_at);
    let now = Date.now();
    let msPerMinute = 60 * 1000;
    let msPerHour = msPerMinute * 60;

    let elapsed = now - previously;

    return Math.round(elapsed / msPerHour) + ' hours ago';
  };

  // language=HTML
  let template = `
       <div class="card">
            <div class ="card__header">
                <button class="card__headerBtn"></button>
            </div>
            <div class="card__body">
                <div class="info">
                    <div class="info__id">
                       ID: <a href="${obj.url}" class="info__link">${obj.id}</a>
                        <div class="info__text">${obj.value}</div>
                    </div>
                </div>
                    <div class="card__footer">
                        <div class="update">Last update <time>${calculate()}</time></div>
                    <div class="tag tag--min">${obj.categories}</div>
                </div>   
            </div>
       </div>`;
  fragment.appendChild(joke);
  jokeCard.appendChild(fragment);
  render(template, document.querySelector('#joke'));
};

export { request, createJoke, obj };
