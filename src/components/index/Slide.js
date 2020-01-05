import React from 'react';
import { Link } from 'gatsby';

import { StyledImg, CgrSlide } from './styles/HeroSliderStyles';
// TODO - proptype
const Slide = ({ slide, active }) => (
  //
  <CgrSlide className={active ? 'active' : ''}>
    {/** revealed from wp and enhanced with gatsby plugins */}
    <StyledImg fluid={slide.featured_media.localFile.childImageSharp.fluid} />

    <div className="wbn-overlay-text">
      {/** revealed from wp-rest */}
      <h1 className="wbn-header">{slide.acf.slider_header}</h1>
      <p className="wbn-text">{slide.acf.slider_text}</p>
      <Link to={slide.acf.slider_button_link}>
        <button type="button">{slide.acf.slider_button_text}</button>
      </Link>
    </div>
  </CgrSlide>
);

export default Slide;
