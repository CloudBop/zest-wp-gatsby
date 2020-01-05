import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
//
import WhiteLogo from '../images/tango_logo_white.svg';
import CloseButton from '../images/tango_close_button.svg';
//
import PropTypes from 'prop-types';

import { Overlay } from './styles/OverlayMenuStyles';

const OverlayMenu = ({ menuOpen, callback }) => {
  /**
   * static query, can be called from any component but with no variables
   * filter by menu_id
   */
  const { menu: { edges: [ { node: menu } ] } } = useStaticQuery(
    graphql`
      query OverlayMenu {
        menu: allWordpressWpApiMenusMenusItems(filter: { wordpress_id: { eq: 5 } }) {
          totalCount
          edges {
            node {
              items {
                title
                url
              }
            }
          }
        }
      }
    `
  );

  return (
    <Overlay menuOpen={menuOpen}>
      <div className="inner">
        <img className="whiteLogo" src={WhiteLogo} alt="tango-white-logo" />
        <ul className="overlayMenu">
          {menu.items.map((item, i) => (
            <li key={i}>
              <Link to={item.url} activeClassName="overlayActive">
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="closeButton" onClick={callback} role="button" tabIndex="0" onKeyDown={callback}>
          <img src={CloseButton} alt="tango-close-button" />
        </div>
      </div>
    </Overlay>
  );
};

OverlayMenu.propTypes = {
  menuOpen: PropTypes.bool.isRequired,
  callback: PropTypes.func.isRequired
};

export default OverlayMenu;
