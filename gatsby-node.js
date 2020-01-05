/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
// You can delete this file if you're not using it
const path = require('path');
// https://www.npmjs.com/package/slash
const slash = require('slash');
// all of the pages revealed by WP-REST-API
exports.createPages = async ({ graphql, actions }) => {
  //
  const { createPage } = actions;
  // abs path to template
  const pageTemplate = path.resolve('./src/templates/page.js');
  // query
  const result = await graphql(`
    {
      allWordpressPage {
        edges {
          node {
            id
            status
            link
            wordpress_id
            wordpress_parent
          }
        }
      }
    }
  `);

  // Check for errors
  if (result.errors) {
    throw new Error(result.errors);
  }
  //
  const { allWordpressPage } = result.data;
  // loop over all pages
  allWordpressPage.edges.forEach(edge => {
    // if published
    if (edge.node.status === 'publish') {
      //
      createPage({
        path: edge.node.link,
        // Convert Windows backslash paths to slash paths: foo\\bar ➔ foo/bar
        component: slash(pageTemplate),
        // reveal to component template
        context: {
          id: edge.node.id,
          parent: edge.node.wordpress_parent,
          wpId: edge.node.wordpress_id
        }
      });
    }
  });
};
