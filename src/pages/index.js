import React from 'react';
import {graphql} from 'gatsby';

import {Layout, SectionHero, SectionGrid} from '../components/index';

export const query = graphql`
	query Index {
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

const Index = ({ data }) => {
	const { siteData } = data // data.markdownRemark holds your post data
	const Ctx = {
		title: "Home",
		pageContext: {
			site: {
				siteMetadata: siteData.data.site_metadata
			},
			frontmatter: {
				title: "Home",
			}
		}
	}
	const InfoHero = {
		section_id: "hero",
		type: "section_hero",
		title: "Ecritoire",
		image: "images/5.jpg",
		content: "Juste quelques mots..."
	}
	const InfoGrid = {
		col_number: 'three',
		grid_items: [
			{
				title : 'Bordēn',
				title_url: "/borden/chap21",
				image: "images/borden.svg",
				content: "Iz et Elisabeth"
			},
			{
				title : 'Elémentaire',
				title_url: "/elementaire/chapitre-1",
				image: "images/elementaire.svg",
				content: "Les aventures de Lonie de l'autre côté du miroir"
			},
			{
				title : 'Une veille de Noël',
				title_url: "/xmas-day/01-obscurite",
				image: "images/xmas-day.svg",
				content: "De l'Avent à Noël"
			},
			{
				title : 'Le Projet Esprit',
				title_url: "/le-projet-esprit/01-sage",
				image: "images/le-projet-esprit.png",
				content: "Dessine moi un mouton"
			},
			{
				title : 'Les Voyages de Nils',
				title_url: "/les-voyages-de-nils/chapitre-1",
				image: "images/nils.svg",
				content: "Une Histoire de Famille"
			},
			{
				title : 'La Reine des Licornes',
				title_url: "/licornes/chap01",
				image: "images/licornes.svg",
				content: "Pas facile d'être la Reine..."
			},
			{
				title : 'Brouillons',
				title_url: "/brouillons/",
				image: "images/brouillons.svg",
				content: "Quelques pages au vent"
			},
		]
	}

	return (
		<Layout {...Ctx}>
			<SectionHero {...Ctx} section={InfoHero} site={Ctx.pageContext.site}/>
			<SectionGrid {...Ctx} section={InfoGrid} site={Ctx.pageContext.site}/>
		</Layout>
	)
}

export default Index