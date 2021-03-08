/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const slugify = require("slugify")

exports.createSchemaCustomization = ({ actions }) => {
	const { createTypes } = actions
	const typeDefs = `
		type MarkdownRemark implements Node {
			slug: String!
			opus: String!
		}
	`
	createTypes(typeDefs)
}

exports.createResolvers = ({ createResolvers }) => {
	const resolvers = {
		MarkdownRemark: {
			slug: {
				type: "String!",
				resolve: source => slugify(source.fileAbsolutePath.split(new RegExp("/|.md")).reverse()[1], { lower: true })
			},
			opus: {
				type: "String!",
				resolve: source => slugify(source.fileAbsolutePath.split(new RegExp("/|.md")).reverse()[2], { lower: true })
			},
		},
	}
	createResolvers(resolvers)
}

exports.createPages = async function ({ actions, graphql }) {
	let Opus = new Set();
	const { data } = await graphql(`
	query AddPages {
		allMarkdownRemark(filter: {frontmatter: {draft: {eq: false}}}, sort: {fields: frontmatter___date}) {
			edges {
				node {
					id
					opus
					slug
				}
			}
		}
	}
	`)
	data.allMarkdownRemark.edges.forEach(edge => {
		Opus.add(edge.node.opus);
		actions.createPage({
			path: `${edge.node.opus}/${edge.node.slug}`,
			component: require.resolve(`./src/templates/chapter.js`),
			context: { opus: edge.node.opus, id: edge.node.id },
		})
	})
	Opus.forEach(opus => {
		actions.createPage({
			path: opus,
			component: require.resolve(`./src/templates/opus.js`),
			context: { opus },
		})
	})
}
