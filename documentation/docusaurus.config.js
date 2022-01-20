// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const lightCodeTheme = require(`prism-react-renderer/themes/github`);
const darkCodeTheme = require(`prism-react-renderer/themes/dracula`);
/** @type {import('@docusaurus/types').Config} */
const config = {
  baseUrl: `/`,
  favicon: `img/favicon.ico`,
  i18n: {
    defaultLocale: `en`,
    locales: [`en`, `fr`],
  },
  onBrokenLinks: `throw`,
  onBrokenMarkdownLinks: `throw`,
  onDuplicateRoutes: `throw`,
  organizationName: `Sonia-corporation`,
  presets: [
    [
      `classic`,
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        blog: {
          blogDescription: `The blog containing the important updates and information to know about this GitHub stale action.`,
          blogTitle: `GitHub stale action blog`,
          // Please change this to your repo.
          editUrl: `https://github.com/Sonia-corporation/stale/tree/develop/documentation/`,
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
                href: `https://github.com/Sonia-corporation/stale/issues/new/choose`,
                label: `New issue`,
              },
              {
                href: `https://github.com/Sonia-corporation/stale/blob/develop/CHANGELOG.md`,
                label: `Changelog`,
              },
            ],
            title: `Useful links`,
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
            position: `right`,
            type: `localeDropdown`,
          },
          {
            href: `https://github.com/Sonia-corporation/stale`,
            label: `GitHub`,
            position: `right`,
          },
        ],
        logo: {
          alt: `GitHub stale action`,
          src: `img/logo.svg`,
        },
        title: `GitHub stale action`,
      },
      prism: {
        darkTheme: darkCodeTheme,
        theme: lightCodeTheme,
      },
    }),
  title: `GitHub stale action`,
  url: `https://sonia-corporation.github.io`,
};

module.exports = config;
