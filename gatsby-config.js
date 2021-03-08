const siteMetadata = require('./site-metadata.json')

module.exports = {
    pathPrefix: '/',
    siteMetadata: siteMetadata,
    plugins: [
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        `gatsby-plugin-react-helmet`,
        `gatsby-source-data`,
        {
          resolve: `gatsby-transformer-remark`,
          options: {
            plugins: [
              {
                resolve: `gatsby-remark-images`,
                options: {
                  maxWidth: 800,
                },
              },
            ],
          },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `markdown`,
                path: `${__dirname}/src/markdown`
            }
        },
        {
            resolve: `gatsby-plugin-sass`,
            options: {}
        },
      //   {
      //       resolve: `gatsby-remark-page-creator`,
      //       options: {}
      //   },
      //   {
      //       resolve: `@stackbit/gatsby-plugin-menus`,
      //       options: {
      //           sourceUrlPath: `fields.url`,
      //           pageContextProperty: `menus`,
      //       }
      //   }
    ]
};
