#Redux Isomorphic Starter Kit

This kit have all what you need to start new app ;) 
You can find here integrated React with Redux and Router, implemented simple JWT (JSON Web Tokens) authentication, CSS Module and all is isomorphic so Server Side Rendering works great. Dev server works with hot reloading (with react and css modules).

Go below to read about all used tools and technology.

##Install and run

After clone repository you need to run:

* `npm install`
* `npm run dist` for build files
* `npm run serve` and go to page `http://localhost:3000` for dev server

###Available commands

* `npm run dist [-- --api_uri]` - compiling files (files version for production `NODE_ENV=production`) - you can use `api_uri` parameter to change `api_uri` config value
* `npm run server` - running simple node server - without compile so you need run `dist` method first
* `npm run serve [-- --api_uri]` - running hot dev server (default on `http://localhost:3000`) - you can use `api_uri` parameter to change `api_uri` config value (example: `npm run serve -- --api_uri=http:\/\/localhost:8080\/api\/v1\/`)
* `npm run test` - running mocha tests
* `npm run test-watch` - running mocha tests in watch mode
* `npm run lint` - running eslint

Check `package.json` for aliases.

##About

###TODO

* Add isomorphic pre-fetching data (using compositions from ES6)
* Internationalization
* Authorization (for pages/components)
* Better documentation

###Structure

```
.
├── bin                        # Scripts for npm run
├── public                     # All built files (At this address should indicate the URL)
│   └── mock-api               # Mocked API files (only for example) - You can delete then
├── config                     # Project configuration settings
├── server                     # Koa application (uses webpack middleware)
│   └── main.js                # Server application entry point
├── src                        # Application source code
│   ├── actions                # Redux actions
│   ├── components             # React Components
│   │   └── index.js           # File with all exported reducers (for easy use)
│   ├── containers             # React Components but for pages structures
│   │   └── index.js           # File with all exported reducers (for easy use)
│   ├── helpers                # Helper scripts
│   ├── middleware             # Redux middleware
│   ├── reducers               # Redux reducers
│   │   └── index.js           # File with all exported reducers (for easy use)
│   ├── stores                 # Redux stores configuration
│   ├── app.js                 # Application root file
│   ├── dev-server.js          # Application dev server root file
│   ├── routes.js              # Application routes definitions
│   ├── server.js              # Application server root file
└── config.js                  # Base config file - used by Webpack, Babel, Webpack Isomorphic Tools, SSR and more
└── isomorphic-tool-config.js  # Config file for Webpack Isomorphic Tools
└── webpack-config.js          # Config file for Webpack
```

Tests must be in the directory `__tests__` which should be in the `./src` or deeper (check `./src/actions/__tests__`). The `test` commands search for `./src/**/__tests__/**/*.js`.

###Used Tools

* `webpack` - https://webpack.github.io
* `babel` - https://babeljs.io
* `webpack-isomorphic-tools` - https://github.com/halt-hammerzeit/webpack-isomorphic-tools
* `css-modules` - https://github.com/css-modules/css-modules
* `postcss` - https://github.com/postcss/postcss-loader
* `autoprefixer` - https://github.com/postcss/autoprefixer
* `mocha` - https://mochajs.org
* `chai` - http://chaijs.com

###Used Technology

* `react` (JSX) - https://facebook.github.io/react
* `redux` - https://github.com/rackt/redux
* `react-router` - https://github.com/rackt/react-router and `redux-router` - https://github.com/rackt/redux-router
* `ES2015/ES2016` (babel; ES6 and stage-0 - ES7) - https://babeljs.io/docs/learn-es2015
* `isomorphic-fetch` - https://github.com/matthew-andrews/isomorphic-fetch (https://github.com/github/fetch)
* `material-ui` - http://www.material-ui.com
* `sass` (`node-sass`) - http://sass-lang.com
* `lodash` - https://lodash.com
* `humps` - https://github.com/domchristie/humps
* `normalizr` - https://github.com/gaearon/normalizr
* `normalize.css` - https://github.com/necolas/normalize.css
* `react-helmet` - https://github.com/nfl/react-helmet

###Tested on

* node `5.2.0`
* npm `3.3.12`

###License

The MIT License (MIT)