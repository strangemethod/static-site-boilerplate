# Static Site Boilerplate
A dead-simple starting point for static site development via Gulp.

## Objectives
- Compile handlebars templates and partials
- Compile and autoprefix SASS
- Run a local server and sync with LiveReload
- Provide a bare-bones starting point based on HTML5 Boilerplate and Normalize.css

## Install and Run
- `npm install`
- `gulp`

## Local Server
- The server is run by [gulp-connect](https://www.npmjs.com/package/gulp-connect)
- The default root directory is `dist`

## Templates
- Are found in the `/templates` directory
- Are suffixed with `.tpl.html`
- Compile to /dist and are suffixed with `.html` only

## Partials 
- Are found in the `/partials` directory 
- File names are prefixed with underscores and are included in Templates by [gulp-fileinclude](https://www.npmjs.com/package/gulp-file-include)
- `_head.html` and '_foot.html' are based on [HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate/blob/master/src/index.html)

## SASS/CSS
- Are found in the `/sass` directory
- Files suffixed with .scss are compiled to `dist/css`
- Normalize.css is installed via npm

## Static Assets
- Static assets such as images and vendor libraries can be placed in the `assets` directory, and will be copied over to `dist/assets`

## JSON Data
- All JSON data in `/data/app.json` is available to handlebars templates and partials


##License
MIT © [Andrew Bowles](https://github.com/strangemethod)