import './vendor/plugins.js';

(($) => {
  'use strict';

  $(() => {

    $('.bt-menu').on('click', (e) => {
      e.preventDefault();
      $('body').toggleClass('menu-open');
    });

  });
})(jQuery);