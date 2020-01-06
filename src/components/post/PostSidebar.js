import React from 'react';
import AuthorIcon from '../../images/tango-author-icon.svg';
import CategoryIcon from '../../images/tango-category-icon.svg';
import DateIcon from '../../images/tango-date-icon.svg';
import { Link } from 'gatsby';
import { SidebarWrapper, SidebarMenu } from './styles/PostSidebarStyles';

const PostSidebar = ({ date, author, categories }) => (
  <SidebarWrapper>
    <SidebarMenu>
      <h2>Post Sidebar</h2>
      <li className="sidebar-menu-header">
        <img src={DateIcon} alt="tango-date" />
        <span>{date}</span>
      </li>
      <li className="sidebar-menu-header">
        <img src={AuthorIcon} alt="tango-date" />
        <span>{author}</span>
      </li>
      <li className="sidebar-menu-header">
        <img src={CategoryIcon} alt="tango-category" />
        <span>Categories</span>
      </li>
      {categories.map(
        cat =>
          // all categories
          cat.slug !== 'alla-trendspaningar' ? (
            <li key={cat.id}>
              <Link to={`/trends/${cat.slug}`}>
                <span dangerouslySetInnerHTML={{ __html: cat.name }} />
              </Link>
            </li>
          ) : null
      )}
    </SidebarMenu>
  </SidebarWrapper>
);

export default PostSidebar;
