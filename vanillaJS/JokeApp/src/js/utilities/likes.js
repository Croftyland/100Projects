class Likes {
  constructor() {
    this.likes = [];
  }

  addLike(id, value, categories, update, url) {
    const like = { id, value, categories, update, url };
    this.likes.push(like);
    state.push(like);
    return like;
  }

  deleteLike(id) {
    const index = this.likes.findIndex(el => el.id === id);
    this.likes.splice(index, 1);

  }

   checkLike(id) {
    return this.likes.findIndex(el => el.id === id) !== -1;
  }

}

export { Likes };
