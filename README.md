# Exit Script

A client-side popup warning for users clicking on non-government external links.

## Usage

Here is an example of usage. IMPORTANT: This must go at the bottom of the page, just before the closing </body> tag.
```
<script type="text/javascript" src="../exitscript.js"></script>
<script type="text/javascript">
  exitscript({
    title: 'United States Department of Justice',
    warning: 'You are now leaving a Department of Justice web site.',
    logo: 'https://www.justice.gov/sites/all/themes/justice/images/doj-seal-popup.jpg',
    blurb: 'The Department of Justice does not endorse the organizations or views represented by this site and takes no responsibility for, and exercises no control over, the accuracy, accessibility, copyright or trademark compliance or legality of the material contained on this site.',
    thanks: 'Thank you for visiting our site.'
  });
</script>
```

## Development

To work on this library, you need to install [npm](http://npmjs.org).

You will also need browserify:

```
npm install -g browserify
```

To get the project's dependencies, in the project's root type:

```
npm install
```

Then edit the exitscript-src.js file as needed. To compile the library to the user-facing exitscript.js file, type:

```
browserify lib/exitscript-src.js -s exitscript > exitscript.js
```
