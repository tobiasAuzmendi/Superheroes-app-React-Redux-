import React from 'react';
// import { selectDrink } from '../../redux/actions/selectDrink';
import { getHeroInformation } from '../../services/HeroesService';
import { selectHero } from '../../redux/actions/selectHero';
import { connect } from 'react-redux';
import './heroDetail.scss';
import Spinner from '../spinner/Spinner';

const URL_TYPES = {
  detail: 'Detail',
  wiki: 'Wiki',
  comiclink: 'Comics'
};

class HeroDetail extends React.Component {

  componentDidMount() {
    const heroId = this.props.match.params.id;

    getHeroInformation(heroId).then((hero) => {
      this.props.selectHero(hero);
    });
  }

  componentWillUnmount() {
    this.props.selectHero(null);
  }

  renderUrls(urls) {
    return (
      <div className="urls-container">
        <div className="section-subtitle">
          Useful links:
        </div>
        {
          !!urls.length &&
          <div className="urls-list">
            { urls.map((url, index) => (
              <a href={url.url} key={index}>{URL_TYPES[url.type]}</a>
            )) }
          </div>
        }
        {
          !urls.length &&
          <div className="section-text">There are no links available for this hero.</div>
        }
      </div>
    );
  }

  renderBiography(description) {
    return (
      <div>
        <div className="section-subtitle">Biography:</div>
        <div className="section-text">{description ? description : 'There is no biography available for this hero.'}</div>
      </div>
    );
  }

  render() {
    const { hero } = this.props;

    if (hero) {
      return (
        <div id="hero-detail">
          <h1 className="title-text">{hero.name}</h1>
          <div className="section-container">
            <img className="section-image" alt="avatar" src={hero.avatar} />
            { this.renderBiography(hero.description) }
            { this.renderUrls(hero.urls) }
          </div>
        </div>
      );
    }

    return <Spinner />;
  }
}

const mapStateToProps = ({ selectedHero }) => ({
  hero: selectedHero
});

const mapDispatchToProps = dispatch => ({
  selectHero: hero => dispatch(selectHero(hero))
});

export default connect(mapStateToProps, mapDispatchToProps)(HeroDetail);