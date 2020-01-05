/* eslint-disable react/no-danger */
import React from 'react';
import { Link } from 'gatsby';

import tangoMail from '../../images/tango-mail-icon.svg';
import tangoPage from '../../images/tango-page-icon.svg';

import { SidebarWrapper, SidebarMenu, EducationBadge } from './styles/PageSidebarStyles';
// from graphql page template query - gatsby-node
const PageSidebar = ({ children, parentChildren, currentPage, parent }) => {
  // rendered inside ul
  const getParentContent = () =>
    // Page with no children, show default text -> mailing list
    children.edges.length === 0 ? (
      <React.Fragment>
        <li className="sidebar-menu-header">
          <img src={tangoMail} alt="tango-mail" />
          <span>Mail list</span>
        </li>
        <p>
          Do you want to get updated when we publish new trend posts?
          <br />
          Just email us with your name, companyname and mail adress{' '}
          <a href="mailto:anders@tangobrandalliance.se">Anders Lindén</a>
        </p>
      </React.Fragment>
    ) : (
      // Page with children, show menu
      <React.Fragment>
        <li className="sidebar-menu-header">
          <img src={tangoPage} alt="tango-page" /> <span dangerouslySetInnerHTML={{ __html: currentPage.title }} />
        </li>
        {children.edges.map(child => (
          <li key={child.node.id}>
            <Link to={child.node.link}>
              <span dangerouslySetInnerHTML={{ __html: child.node.title }} />
            </Link>
          </li>
        ))}
      </React.Fragment>
    );

  const getChildContent = () => (
    <React.Fragment>
      <li className="sidebar-menu-header">
        <img src={tangoPage} alt="tango-page" /> <span dangerouslySetInnerHTML={{ __html: parent.title }} />
      </li>
      {parentChildren.edges.map(child => (
        // no l
        <li key={child.node.id} className={currentPage.id === child.node.id ? 'sidebar-highlighted' : ''}>
          {/** no link if it's page usr currently on */}
          {currentPage.id === child.node.id ? (
            <span dangerouslySetInnerHTML={{ __html: child.node.title }} />
          ) : (
            <Link to={child.node.link}>
              <span dangerouslySetInnerHTML={{ __html: child.node.title }} />
            </Link>
          )}
        </li>
      ))}
    </React.Fragment>
  );

  return (
    <SidebarWrapper className="col-lg-3">
      {// is set to education ?
      currentPage.acf.education ? (
        <EducationBadge>
          <a href="mailto:anders@tangobrandalliance.se">Enroll the course</a>
        </EducationBadge>
      ) : null}

      <SidebarMenu>
        {// is it parent or child.
        currentPage.wordpress_parent === 0 ? getParentContent() : getChildContent()}
      </SidebarMenu>
    </SidebarWrapper>
  );
};

export default PageSidebar;
