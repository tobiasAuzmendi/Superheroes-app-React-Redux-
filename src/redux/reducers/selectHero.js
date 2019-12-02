const defaultState = null;

function reducer(state = defaultState, { type, payload }) {
  switch(type) {
    case 'HERO_SELECTED':
      const hero = payload.hero;
      return hero ? {
        name: hero.name,
        id: hero.id,
        urls: hero.urls,
        description: hero.description,
        avatar: hero.thumbnail && hero.thumbnail.extension && `${hero.thumbnail.path}.${hero.thumbnail.extension}`
      } : null;
    default:
      return state;
  }
}

export default reducer;