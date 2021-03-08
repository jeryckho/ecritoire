import React from 'react';
// import _ from 'lodash';
import {graphql} from 'gatsby';

import {Layout} from '../components/index';
import {Link} from '../utils'; //, htmlToReact, getPages, withPrefix

export const query = graphql`
	query Opus($opus: String = "") {
		allMarkdownRemark(sort: {fields: frontmatter___date}, filter: {frontmatter: {draft: {eq: false}}, opus: {eq: $opus}}) {
			nodes {
				id
				frontmatter {
					title
				}
				opus
				slug
				excerpt
			}
			totalCount
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

const Opus = ({ data }) => {
	const { allMarkdownRemark, siteData } = data // data.markdownRemark holds your post data
	let Ctx = {
		pageContext: {
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
									{allMarkdownRemark.nodes.map((node) => (<li key={`${node.opus}/${node.slug}`} className="docs-menu-item"><Link to={`/${node.opus}/${node.slug}`} className="docs-item-link">{node.frontmatter.title || node.slug}</Link></li>))}
								</ul>
							</div>
						</div>
					</nav>
					<article className="post type-docs">
						<div className="post-inside">
							<header className="post-header">
								<h1 className="post-title line-left">{allMarkdownRemark.nodes[0].opus}</h1>
							</header>
							<div className="post-content">
								{allMarkdownRemark.nodes.map((node) => (<p key={`${node.opus}/${node.slug}`}><Link to={`/${node.opus}/${node.slug}`} className="docs-item-link"><h2>{node.frontmatter.title || node.slug}</h2></Link>{node.excerpt}</p>))}
							</div>
						</div>
					</article>
					<nav id="page-nav" className="page-nav">
						<div id="page-nav-inside" className="page-nav-inside">
							<h2 className="page-nav-title">Détails</h2>
							<div id="page-nav-link-container">
								<ul>
									{allMarkdownRemark.totalCount ? (<li><em>Chapitres :</em> {allMarkdownRemark.totalCount}</li>) : ''}
								</ul>
							</div>
						</div>
					</nav>
				</div>
			</div>
		</Layout>
	)
}


export default Opus