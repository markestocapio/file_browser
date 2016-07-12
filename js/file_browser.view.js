/**
 * @file file_browser.view.js
 */
(function ($, Drupal) {

  "use strict";

  /**
   * Registers behaviours related to view widget.
   */

  Drupal.behaviors.FileBrowserView = {
    attach: function (context) {
      var $view = $('.view-content');
      $view.prepend('<div class="grid-sizer"></div><div class="gutter-sizer"></div>').once();

      // Indicate that images are loading.
      $view.append('<div class="ajax-progress ajax-progress-fullscreen">&nbsp;</div>');
      $view.imagesLoaded(function () {
        $view.masonry({
          columnWidth: '.grid-sizer',
          gutter: '.gutter-sizer',
          itemSelector: '.grid-item',
          percentPosition: true,
          isFitWidth:true
        });
        // Add a class to reveal the loaded images, which avoids FOUC.
        $('.grid-item').addClass('item-style');
        $view.find('.ajax-progress').remove();
      });

      $('.grid-item').once('bind-click-event').click(function () {
        var input = $(this).find('.views-field-entity-browser-select input');
        input.prop('checked', !input.prop('checked'));
        if (input.prop('checked')) {
          $(this).addClass('checked');
        }
        else {
          $(this).removeClass('checked');
        }
      });

      $(context).find('.entities-list').hide();
      $('.file-browser-show-selection').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('.entities-list').toggle();
        if($('.entities-list').css('display') == 'none' ) {
          $('.file-browser-show-selection').val(Drupal.t('Show current selection'));
        } else {
          $('.file-browser-show-selection').val(Drupal.t('Hide current selection'));
        }
      });
    }
  };

}(jQuery, Drupal));
