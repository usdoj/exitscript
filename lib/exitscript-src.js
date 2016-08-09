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
 *     warning: 'You are now leaving our site.',
 *     logo: 'https://example.com/path/to/logo/image.jpg',
 *     blurb: 'Here is what you should know about leaving our site...',
 *     thanks: 'Thank you for visiting our site.'
 */
function exitscript(options) {

  // Find all links.
  var links = document.querySelectorAll('a');

  // Keep track of the auto-hyperlink timer on this variable.
  var timer;

  links.forEach(function(link) {

    // First a simple external check.
    if (externalLink(link)) {

      var href = link.getAttribute('href');

      // Don't override .gov, .mil, or .fed.us
      var domain = url.parse(href).hostname;
      if (!domain.match(/(\.gov|\.mil|fed\.us)$/)) {

        // Add the click behavior.
        link.addEventListener('click', function(e) {

          // Our mostly hardcoded popup HTML.
          var content = "\
            <div>\
              <p style='text-align:center'><img src='" + options.logo + "' /></p>\
              <p>" + options.warning + "</p>\
              <p>You are about to access: <a href='" + href + "'>" + href + "</a></p>\
              <p>" + options.blurb + "</p>\
              <p>" + options.thanks + "</p>\
            </div>\
          ";

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
          }, 5000);

          // Prevent normal link behavior.
          e.stopPropagation();
          e.preventDefault();
        }, false);
      }
    }
  });
}

// Expose the exitscript() function to the global space.
module.exports = exitscript;
