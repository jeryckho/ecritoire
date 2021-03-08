import React from 'react';
// import _ from 'lodash';
import {graphql} from 'gatsby';

import {Layout} from '../components/index';
import {htmlToReact, Link} from '../utils'; //, getPages, withPrefix

export const query = graphql`
	query Chapter($opus: String = "", $id: String = "") {
		allMarkdownRemark(sort: {fields: frontmatter___date}, filter: {frontmatter: {draft: {eq: false}}, opus: {eq: $opus}}) {
			nodes {
				id
				frontmatter {
					title
				}
				opus
				slug
			}
		}
		markdownRemark(id: {eq: $id}) {
			id
			html
			slug
			timeToRead
			wordCount {
				words
			}
			frontmatter {
				title
				author
				date(formatString: "YYYY-MM-DD")
			}
		}
		siteData {
			data {
				site_metadata {
					palette
					title
					footer {
					content
					has_social
					}
					header {
					has_nav
					logo_img
					logo_img_alt
					nav_links {
						has_subnav
						label
						style
						url
						subnav_links {
							label
							style
							url
						}
					}
					title
					}
				}
			}
		}
	}
`

const Chapter = ({ data }) => {
	const { markdownRemark, allMarkdownRemark, siteData } = data // data.markdownRemark holds your post data
	const { frontmatter, html, id, timeToRead, wordCount } = markdownRemark
	let Ctx = {
		pageContext: {
			frontmatter: { ...frontmatter, title: frontmatter.title || markdownRemark.slug },
			site: {
				siteMetadata: siteData.data.site_metadata
			}
		}
	}
	return (
		<Layout {...Ctx}>
			<div className="inner outer">
				<div className="docs-content">
					<nav id="docs-nav" class="docs-nav">
						<div id="docs-nav-inside" class="docs-nav-inside">
							<div class="docs-nav-menu">
								<ul id="docs-menu" className="docs-menu">
									{allMarkdownRemark.nodes.map((node) => (<li key={`${node.opus}/${node.slug}`} className={`docs-menu-item ${(node.id===id) ? 'current' : ''}`}><Link to={`/${node.opus}/${node.slug}`} className="docs-item-link">{node.frontmatter.title || node.slug}</Link></li>))}
								</ul>
							</div>
						</div>
					</nav>
					<article className="post type-docs">
						<div className="post-inside">
							<header className="post-header">
								<h1 className="post-title line-left">{frontmatter.title || markdownRemark.slug}</h1>
							</header>
							<div className="post-content">
								{htmlToReact(html)}
							</div>
						</div>
					</article>
					<nav id="page-nav" className="page-nav">
						<div id="page-nav-inside" className="page-nav-inside">
							<h2 className="page-nav-title">Détails</h2>
							<div id="page-nav-link-container">
								<ul>
									{frontmatter.author ? (<li><em>Auteur :</em> {frontmatter.author}</li>) : ''}
									{frontmatter.date ? (<li><em>Date :</em> {frontmatter.date}</li>) : ''}
									{timeToRead ? (<li><em>Lecture :</em> {timeToRead} min.</li>) : ''}
									{wordCount.words ? (<li><em>Mots :</em> {wordCount.words}</li>) : ''}
								</ul>
							</div>
						</div>
					</nav>
				</div>
			</div>
		</Layout>
	)
}


export default Chapter