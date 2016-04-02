/**
 * This script relies on the exitWinOpen function and jQuery, and pops open
 * a javascript window when any external link (except for .gov, .mil, .fed.us)
 * is clicked.
 *
 * Since exitWinOpen is only available on dojnet, this is intended only for
 * dojnet.
 */
$(document).ready(function() {
  // Abort now if the main function is not around.
  if (typeof exitWinOpen != 'function') {
    return;
  }
  // Create the necessary divs if they do not exist.
  if (!$('#exitMsg').length) {
    $('body').append('<div id="exitMsg" class="exitMsg" style="display:none;"></div>');
  }
  if (!$('#shadowFilter').length) {
    $('body').append('<div id="shadowFilter" class="blockout" style="display:none;"></div>');
  }
  // Override the behavior of all external scripts.
  $('a').each(function() {
    var a = new RegExp('/' + window.location.host + '/');
    if (!a.test(this.href)) {
      // Don't override .gov, .mil, or .fed.us
      if (!this.href.match(/(\.gov|\.mil|fed\.us)$/)) {
        $(this).click(function(event) {
          event.preventDefault();
          event.stopPropagation();
          exitWinOpen(this.href);
        });
      }
    }
  });
});
