const defaultState = {
  heroes: [],
  isLoading: true,
  page: 0
};

const mapHeroes = (heroes) => heroes.map(hero => ({
  name: hero.name,
  id: hero.id,
  avatar: hero.thumbnail && hero.thumbnail.extension && `${hero.thumbnail.path}.${hero.thumbnail.extension}`,
  appearsInSeries: !!hero.series.available,
  appearsInStories: !!hero.stories.available,
  appearsInComics: !!hero.comics.available,
  appearsInEvents: !!hero.events.available
}));

function reducer(state = defaultState, { type, payload }) {
  switch(type) {
    case 'LOAD_HEROES_SUCCESS':
      const newHeroes = mapHeroes(payload.heroes);
      return {
        isLoading: false,
        heroes: !state.page ? newHeroes: [...state.heroes, ...newHeroes],
        page: state.page + 1
      };
    case 'LOAD_HEROES_REQUEST':
      return {
        ...state,
        isLoading: true
      };
    default:
      return state;
  }
}

export default reducer;