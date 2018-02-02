// Instantiate our npm/node helpers.
var externalLink = require('external-link');
var url = require('url');
var simpleModal = require('simple-modal');

/**
 * Find all non-government external links on the page and give them popup
 * warning behavior.
 *
 * @param options
 *   An object containing ALL of the following properties (generic examples shown):
 *     title: 'My popup title',
 *     content: '<p>This is my popup content. The external link is {url}.</p>'
 *       Notes: This can be any chunk of HTML, but note that the string "{url}"
 *       will be replaced with an actual clickable link to the external target.
 *     click: mySeparatePopupCallback
 *       Notes: Normally this library displays a popup, but if this 'click'
 *       property contains a callback function, instead that callback function
 *       will trigger, and is expected to provide all functionality.
 *     delay: 5
 *       Number of seconds to wait before automatically sending the user on to
 *       the external target.
 */
function exitscript(options) {

  // Start with defaults.
  var defaults = {
    title: 'You are now leaving this agency website.',
    content: '<p>You are about to access: {url}</p>',
    delay: 5
  };
  // Use these defaults if needed.
  for (var key in defaults) {
    if (typeof options[key] === 'undefined') {
      options[key] = defaults[key];
    }
  }

  // Find all links.
  var links = document.querySelectorAll('a[href]');

  // Keep track of the auto-hyperlink timer on this variable.
  var timer;

  [].forEach.call(links, function(link) {

    // First a simple external check.
    if (externalLink(link)) {

      var href = link.getAttribute('href');

      // Don't override .gov, .mil, or .fed.us
      var domain = url.parse(href).hostname;
      if (!domain.match(/(\.gov|\.mil|fed\.us)$/)) {

        // Add the click behavior.
        link.addEventListener('click', function(e) {

          // Use some external click behavior?
          if (typeof options.click !== 'undefined') {
            options.click(href);
          }

          // Otherwise use this library.
          else {
            // Our mostly hardcoded popup HTML.
            var link = '<a href="' + href + '">' + href + '</a>';
            var content = options.content.replace('{url}', link);

            // Show the modal.
            var modal = simpleModal({
              title: options.title,
              content: content,
              buttons: [],
              onClose: function() { clearTimeout(timer); }
            });
            modal.show();

            // Visit the href automatically in 5 seconds.
            timer = setTimeout(function() {
              window.location.href = href;
            }, 1000 * options.delay);
          }

          // Always prevent normal link behavior.
          e.stopPropagation();
          e.preventDefault();
        }, false);
      }
    }
  });
}

// Expose the exitscript() function to the global space.
module.exports = exitscript;
