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
- Are found in the `/src/templates` directory
- Are suffixed with `.tpl.html`
- Compile to /public and are suffixed with `.html` only

## Partials 
- Are found in the `/src/partials` directory 
- Partials are included in templates via [gulp-hb](https://github.com/shannonmoeller/gulp-hb)
- `_head.html` and '_foot.html' are based on [HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate/blob/master/src/index.html)

## SASS/CSS
- Are found in the `/src/sass` directory
- Files suffixed with .scss are compiled to `public/css`
- Filex prefixed with underscores are skipped by the compiler
- Normalize.css is included in the `/src/vendor` directory

## Components
- Components are found in the `/src/components` directory
- Components can be included as templates partials
- Components are fully portable, and may contain their SASS and JS. These are compiled to `/public/css/components.css` and '/public/js/components.js'.

## Static Assets
- Static assets such as images, fonts and vendor libraries can be placed directly in `/public`

## JSON Data
- All JSON data in `/src/data/*.json` is available to handlebars templates and partials


##License
MIT © [Andrew Bowles](https://github.com/strangemethod)