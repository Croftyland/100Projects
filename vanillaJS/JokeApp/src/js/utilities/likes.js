import { obj } from './request';

document.querySelector('.container').addEventListener('click', event => {
  if (event.target.matches('.card__header, .card__headerBtn')) {
    controlFavourite();
  }
})

let state = [];

class Favourite {
  constructor() {
    this.favourites = [];
  }

  addLike(id, value, categories, update, url) {
    const fav = { id, value, categories, update, url };
    this.favourites.push(fav);
    state.push(fav)
    console.log(state);
    return fav;
  }

  deleteLike(id) {
    const index = this.favourites.findIndex(el => el.id === id);
    this.favourites.splice(index, 1);
  }

  checkLike(id) {
    return this.favourites.findIndex(el => el.id === id) !== -1;
  }
}

const checkLike = (id) => {
  return state.findIndex(el => el.id === id) !== -1;
}

const deleteLike = (id) => {
  const index = state.findIndex(el => el.id === id);
  console.log(index);
  state.splice(index, 1);
}

const controlFavourite = () => {
  if (!obj.favourites) obj.favourites = new Favourite();
  const currentID = obj.id;
  if (!obj.favourites.checkLike(currentID)) {
    const newLike = obj.favourites.addLike(
      currentID,
      obj.value,
      obj.url,
      obj.value,
      obj.categories,
      obj.updated_at
    );
  } else {
    //obj.favourites.deleteLike(currentID);
    deleteLike(currentID);
  }
};

export { controlFavourite };
