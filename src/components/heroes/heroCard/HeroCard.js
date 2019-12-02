import React from 'react';
import './heroCard.scss';

class HeroCard extends React.PureComponent {

  renderParticipation = participationName => (
    <div className="participation">
      <div className="participation-description">{participationName}</div>
      <img className="participation-flag" alt="participation-flag" src={require("../../../assets/images/captain-america-shield.jpg")}/>
    </div>
  );

  renderParticipations = hero => (
    <div>
      { hero.appearsInComics && this.renderParticipation('Comics') }
      { hero.appearsInSeries && this.renderParticipation('Series') }
      { hero.appearsInEvents && this.renderParticipation('Events') }
      { hero.appearsInStories && this.renderParticipation('Stories') }
      { !hero.appearsInComics && !hero.appearsInSeries && !hero.appearsInEvents && !hero.appearsInStories &&
        <div className="participation-description">Has no participations.</div>
      }
    </div>
  );

  render() {
    const { hero, navigateToHeroDetail } = this.props;

    return (
      <div className="hero-card" onClick={() => { navigateToHeroDetail(hero) }}>
        <div className="card-container">
          <div className="card-content">
            <div className="hero-name">{hero.name}</div>
            <div className="hero-participations">
              { this.renderParticipations(hero) }
            </div>
          </div>
          <div className="image-container"><img alt="avatar" src={hero.avatar} className="card-image" /></div>
        </div>
      </div>
    );
  }
}

export default HeroCard;