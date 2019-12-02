import React from 'react';
import { connect } from 'react-redux';
import HeroCard from './heroCard/HeroCard';
import { loadHeroes, setHeroesLoading } from '../../redux/actions/heroesList';
import { retrieveHeroes } from '../../services/HeroesService';
import './heroesList.scss';
import Spinner from '../spinner/Spinner';

class HeroesList extends React.Component {

    componentDidMount() {
      if (!this.props.page) {
        retrieveHeroes(this.props.page).then((heroes) => {
          this.props.loadHeroes(heroes);
          this.listenForScrollDown();
        });
      } else {
        this.listenForScrollDown();
      }
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.onScrollDown);
    }

    listenForScrollDown = () => {
      window.addEventListener('scroll', this.onScrollDown);
    }

    onScrollDown = () => {
      const { setHeroesLoading, loadHeroes, page, isLoading } = this.props;

      if (!isLoading && (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
          setHeroesLoading();
          retrieveHeroes(page + 1).then((heroes) => {
            loadHeroes(heroes);
          });
      }
    }

    navigateToHeroDetail = (hero) => {
      return this.props.history.push(`heroes/${hero.id}`, {
        hero
      })
    }

    render() {
      const { isLoading, heroes } = this.props;

      return (
        <div id="heroes-list-container">
          <img className="header-image" src={require("../../assets/images/marvel.png")} alt="header-img" />
          {
            !!heroes.length &&
            heroes.map((hero, index) => (
              <HeroCard hero={hero} key={index} navigateToHeroDetail={this.navigateToHeroDetail}/>
            ))
          }
          {
            isLoading && <Spinner />
          }
        </div>
      );
    }
}

const mapStateToProps = ({ heroesList }) => ({
  heroes: heroesList.heroes,
  isLoading: heroesList.isLoading,
  page: heroesList.page
});

const mapDispatchToProps = dispatch => ({
  loadHeroes: heroes => dispatch(loadHeroes(heroes)),
  setHeroesLoading: heroes => dispatch(setHeroesLoading(heroes))
});

export default connect(mapStateToProps, mapDispatchToProps)(HeroesList);