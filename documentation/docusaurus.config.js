// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const lightCodeTheme = require(`prism-react-renderer/themes/github`);
const darkCodeTheme = require(`prism-react-renderer/themes/dracula`);
/** @type {import('@docusaurus/types').Config} */
const config = {
  baseUrl: `/`,
  favicon: `img/favicon.ico`,
  onBrokenLinks: `throw`,
  onBrokenMarkdownLinks: `throw`,
  organizationName: `Sonia-corporation`,
  presets: [
    [
      `classic`,
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        blog: {
          // Please change this to your repo.
          editUrl: `https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/`,
          showReadingTime: true,
        },
        docs: {
          // Please change this to your repo.
          editUrl: `https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/`,
          sidebarPath: require.resolve(`./sidebars.js`),
        },
        theme: {
          customCss: require.resolve(`./src/css/custom.css`),
        },
      }),
    ],
  ],
  projectName: `stale`,
  tagline: `Dinosaurs are cool`,
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      footer: {
        copyright: `Copyright © ${new Date().getFullYear()} Stale, Sonia Corporation. Built with Docusaurus.`,
        links: [
          {
            items: [
              {
                label: `Tutorial`,
                to: `/docs/intro`,
              },
            ],
            title: `Docs`,
          },
          {
            items: [
              {
                href: `https://discordapp.com/invite/docusaurus`,
                label: `Discord`,
              },
              {
                href: `https://twitter.com/docusaurus`,
                label: `Twitter`,
              },
            ],
            title: `Community`,
          },
          {
            items: [
              {
                label: `Blog`,
                to: `/blog`,
              },
              {
                href: `https://github.com/Sonia-corporation/stale`,
                label: `GitHub`,
              },
            ],
            title: `More`,
          },
        ],
        style: `dark`,
      },
      navbar: {
        items: [
          {
            docId: `intro`,
            label: `Tutorial`,
            position: `left`,
            type: `doc`,
          },
          { label: `Blog`, position: `left`, to: `/blog` },
          {
            href: `https://github.com/facebook/docusaurus`,
            label: `GitHub`,
            position: `right`,
          },
        ],
        logo: {
          alt: `My Site Logo`,
          src: `img/logo.svg`,
        },
        title: `My Site`,
      },
      prism: {
        darkTheme: darkCodeTheme,
        theme: lightCodeTheme,
      },
    }),
  title: `My Site`,
  url: `https://your-docusaurus-test-site.com`,
};

module.exports = config;
