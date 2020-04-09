# Static Site Boilerplate

[Webpack](https://webpack.js.org/) backed project to create a simple HTML-CSS-JS based static websites with the help of [Typescript](https://www.typescriptlang.org/), [PostCSS](https://postcss.org/), [ESLint](https://eslint.org/).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

```
NodeJS
```

### Installing

Install the dependencies with simple install command.

```
$ yarn
```

or

```
$ npm install
```

---

## Configuring and Customizing

While the webpack setup is opioninated about how the compilation will work and how the main structure has to be, it's also possible to customize to your suitable needs without even opening the webpack config directly.

For accomplishing this, you should look at the `website.config.js` file. Here you should fill the `title`, `description`, `appName`, `developer`, `developerURL` and `favicon` sections with your websites' information.

`paths`, `regex`, `compilation` and `optimization` sections can be configured to suit your needs better. (Currently some directories may not be changed like `src`).

---

### Folder Structure

Project consists of two main directories; the root directory and `src` sub-directory under root, which consists of main source files for the compilation of websites, such as HTML (`.html`), CSS or PostCSS (`.css`), Javascript (`.js`), Typescript (`.ts`), Fonts (`.woff2|.woff|.ttf|.eot`), Images (`.jpg|.svg|.png|.gif`) etc.

```
|-- /
|---- src/
|------ assets/
|-------- fonts/
|-------- images/
|-------- scripts/
|-------- styles/
|------ pages/
|------ ...
|------ website.config.js
```

(_The root direcotry also has other config files such .babelrc, .eslintrc.js, postcss.config.js, webpack.config.js etc._)

---

### Page Creation and Development

Boilerplate consists of three sample pages when you first initiated it.

```
|-- pages/
|---- home.html
|---- about-us.html
|---- contact.html
```

#### Naming and Routing

While the HTML pages are being compiled for distribution, the file name will be used to fill `<title>` section of the page, and also it will create the url slug for the page by creating a directory with the same name, and copying the page as the `index.html` of the directory.

For example, a file named `products-and-services.html` would result in the creation of the route `www.projectdomain.com/products-and-services/`, which would be served by `index.html` inside that directory. The page title would be `Product And Services`.

(In the future more customization options should be added to alter default behaviour.)

### Bundle Injection and Templating

Webpack ([html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)) by default supports a light variant of EJS (Underscore/Lodash Templates) to inject bundles to the page. This mostly results in `style` bundles added to the end of `<head>` section, `script` bundles added to the end of `<bod>` section, also `favicon` and `manifest` data added to `<head>` section just before styles.

---

## Built With

- [Webpack](https://webpack.js.org/) - App bundler
- [PostCSS](https://postcss.org/) - CSS Post-Processor
- [PostCSS-preset-env](https://preset-env.cssdb.org/) - PostCSS plugin for nextgen CSS features
- [Typescript](https://www.typescriptlang.org/) - Typescript
- [Babel](https://babeljs.io/) - Javascript Transpiler
- [ESLint](https://eslint.org/) - Javascript/Typescript Linter
- [CSSNano](https://cssnano.co/) - CSS minifier
- [Prettier](https://prettier.io/) - Code Formatter

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

- **Ömer Balyali** - _Development_ - [Github Profile](https://github.com/omerbalyali)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
