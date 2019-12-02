export const loadHeroes = heroes => ({
  type: 'LOAD_HEROES_SUCCESS',
  payload: {
    heroes
  }
});

export const setHeroesLoading = () => ({
  type: 'LOAD_HEROES_REQUEST',
  payload: {
    isLoading: true
  }
});