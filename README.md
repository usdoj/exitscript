# Exit Script

A client-side popup warning for users clicking on non-government external links.

## Usage

Here is an example of usage. IMPORTANT: This must go at the bottom of the page, just before the closing </body> tag.
```
<script type="text/javascript" src="../exitscript.js"></script>
<script type="text/javascript">
  exitscript({
    title: 'You are now leaving this agency website.',
    content: '<p>You are about to access: {url}</p>',
    delay: 5
  });
</script>
```

Note the text `{url}` in the 'content' property. This is the only "dynamic" part of the content, and this text is replaced with a link to the external target.

One alternative option is possible: "click", which should be a javascript function that takes an href, and handles all of the popup behavior. This is only useful for cases where you already have your own popup behavior implemented and just need this library to add it to all external non-government links. If you take this approach, the snippet would simply be:

```
<script type="text/javascript" src="../exitscript.js"></script>
<script type="text/javascript">
  exitscript({
    click: myPopupFunction
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
