// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightClientMermaid from '@pasqal-io/starlight-client-mermaid';
import deqlGrammar from './deql-grammar.mjs';
import deqlTheme from './deql-theme.mjs';

// https://astro.build/config
export default defineConfig({
	site: 'https://github.com/Daksha-RC/log-sourced-architecture.git',
	markdown: {
		shikiConfig: {
			langs: [deqlGrammar],
		},
	},
	integrations: [
		starlight({
			title: 'LSA',
			logo: {
				src: '../site/public/favicon.svg',
				alt: 'Logo',
			},
			favicon: '/favicon.svg',
			description:
				'A declarative language for defining, executing, and inspecting business decisions over event-sourced state, enabling progressively evolving and scalable CQRS-ES systems.',
			plugins: [
				starlightClientMermaid(),
			],
			customCss: ['./src/styles/custom.css'],
			head: [
				{ tag: 'script', attrs: { src: '/docs-nav.js' } },
				{ tag: 'link', attrs: { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css' } },
			],
			expressiveCode: {
				themes: [deqlTheme],
				shiki: {
					langs: [deqlGrammar],
				},
			},
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/Daksha-RC/log-sourced-architecture.git',
				},
			],
			sidebar: [
				{ label: 'Overview', slug: 'overview' },
				{ label: 'Part 1', slug: '01-state-is-transient-facts-endure' },
				{ label: 'Part 2', slug: '02-cost-of-fragmented-truth' },
				{ label: 'Part 3', slug: '03-explainability-starts-with-facts-and-reasoning' },
				{ label: 'Part 4', slug: '04-access-should-not-depend-on-synchronization' },
				{ label: 'Part 5', slug: '05-facts-should-outlive-technology' },
				{ label: 'Part 6', slug: '06-why-history-matters' },
				{ label: 'Part 7', slug: '07-facts-as-a-foundation-for-ai' },
				{ label: 'Part 8', slug: '08-the-log-sourced-architecture-initiative' },
			],
		}),
	],
});
