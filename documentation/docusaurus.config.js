// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const lightCodeTheme = require(`prism-react-renderer/themes/github`);
const darkCodeTheme = require(`prism-react-renderer/themes/dracula`);
/** @type {import('@docusaurus/types').Config} */
const config = {
  baseUrl: `/stale/`,
  baseUrlIssueBanner: true,
  deploymentBranch: `gh-pages`,
  favicon: `img/favicon.ico`,
  i18n: {
    defaultLocale: `en`,
    locales: [`en`, `fr`],
  },
  noIndex: false,
  onBrokenLinks: `throw`,
  onBrokenMarkdownLinks: `throw`,
  onDuplicateRoutes: `throw`,
  organizationName: `sonia-corporation`,
  presets: [
    [
      `classic`,
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        blog: {
          blogDescription: `The blog containing the important updates and information to know about this GitHub stale action.`,
          blogSidebarCount: 5,
          blogSidebarTitle: `Recent posts`,
          blogTitle: `GitHub stale action blog`,
          editUrl: `https://github.com/Sonia-corporation/stale/tree/develop/documentation/`,
          path: `blog`,
          postsPerPage: 10,
          showReadingTime: true,
          sortPosts: `descending`,
        },
        docs: {
          editUrl: `https://github.com/Sonia-corporation/stale/tree/develop/documentation/`,
          sidebarPath: require.resolve(`./sidebars.js`),
        },
        theme: {
          customCss: require.resolve(`./src/css/custom.css`),
        },
      }),
    ],
  ],
  projectName: `stale`,
  tagline: `A GitHub action to stale and close automatically your issues and pull requests.`,
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      footer: {
        copyright: `Copyright © ${new Date().getFullYear()} Stale, Sonia Corporation. Built with Docusaurus.`,
        links: [
          {
            items: [
              {
                label: `Introduction`,
                to: `/docs/introduction`,
              },
              {
                label: `Getting started`,
                to: `/docs/getting-started/workflow-creation`,
              },
              {
                label: `Examples`,
                to: `/docs/examples/issues-examples`,
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
            docId: `introduction`,
            label: `Documentation`,
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
  trailingSlash: false,
  url: `https://sonia-corporation.github.io`,
};

module.exports = config;
