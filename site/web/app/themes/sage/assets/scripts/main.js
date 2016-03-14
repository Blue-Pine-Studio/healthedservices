/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 * ======================================================================== */

(function ($) {

  // Use this variable to set up the common and page specific functions. If you
  // rename this variable, you will also need to rename the namespace below.
  var Sage = {
    // All pages
    'common': {
      init: function () {
        // JavaScript to be fired on all pages
      },
      finalize: function () {
        // JavaScript to be fired on all pages, after page specific JS is fired
      }
    },
    // Home page
    'home': {
      init: function () {
        // JavaScript to be fired on the home page
      },
      finalize: function () {
        // JavaScript to be fired on the home page, after the init JS
      }
    },
    // About us page, note the change from about-us to about_us.
    'about_us': {
      init: function () {
        // JavaScript to be fired on the about us page
      }
    }
  };

  // The routing fires all common scripts, followed by the page specific scripts.
  // Add additional events for more control over timing e.g. a finalize event
  var UTIL = {
    fire: function (func, funcname, args) {
      var fire;
      var namespace = Sage;
      funcname = (funcname === undefined) ? 'init' : funcname;
      fire = func !== '';
      fire = fire && namespace[func];
      fire = fire && typeof namespace[func][funcname] === 'function';

      if (fire) {
        namespace[func][funcname](args);
      }
    },
    loadEvents: function () {
      // Fire common init JS
      UTIL.fire('common');

      // Fire page-specific init JS, and then finalize JS
      $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function (i, classnm) {
        UTIL.fire(classnm);
        UTIL.fire(classnm, 'finalize');
      });

      // Fire common finalize JS
      UTIL.fire('common', 'finalize');
    }
  };

  // Load Events
  $(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.


/** Reusable Functions **/
/********************************************************************/

jQuery(document).ready(function($){
  //you can now use $ as your jQuery object.
  var body = $( 'body' );
});

  function scaleVideoContainer() {

    var height = ($(window).height()) * 0.63;
    var unitHeight = parseInt(height) + 'px';
    $('.homepage-hero-module').css('height', unitHeight);

  }

  function initBannerVideoSize(element) {

    $(element).each(function () {
      $(this).data('height', $(this).height());
      $(this).data('width', $(this).width());
    });

    scaleBannerVideoSize(element);

  }

  function scaleBannerVideoSize(element) {

    var windowWidth = $(window).width(),
      windowHeight = $(window).height(),
      videoWidth,
      videoHeight;

    console.log(windowHeight);

    $(element).each(function () {
      var videoAspectRatio = $(this).data('height') / $(this).data('width'),
        windowAspectRatio = windowHeight / windowWidth;

      if (videoAspectRatio > windowAspectRatio) {
        videoWidth = windowWidth;
        videoHeight = videoWidth * videoAspectRatio;
        $(this).css({
          'top': -(videoHeight - windowHeight) / 2 + 'px',
          'margin-left': 0
        });
      } else {
        videoHeight = windowHeight;
        videoWidth = videoHeight / videoAspectRatio;
        $(this).css({
          'margin-top': 0,
          'margin-left': -(videoWidth - windowWidth) / 2 + 'px'
        });
      }

      $(this).width(videoWidth).height(videoHeight);

      $('.homepage-hero-module .video-container video').addClass('fadeIn animated');


    });
  }
