# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ npm i
```

### Local Development

```
$ npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### I18n

This website support English and French translations.  
Once you changed something for the default version (English), you can create the French version (if you can, else ask for help!).

You can test the French version by running `npm run start:french`.

You must also run `npm run write-translations` and `npm run write-translations:french` to update the translation files and add your additional translations if needed.

See also [the i18n documentation](https://docusaurus.io/docs/i18n/introduction) for further help.

### Deployment

The deployment will be done by the CI when a change occur on the master branch.
