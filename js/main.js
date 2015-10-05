//

require.config({
  baseUrl: 'js',
  paths: {
    // jquery: 'jquery',
    // placeholderLabel: 'placeholderLabel',
    // selectbox: 'selectbox'
  }
});


//

require([
  'jquery',
  'listbox',
  'nav',
  'placeholderLabel'
], function ($, Listbox, Nav) {

  "use strict";

  $(document).ready(function () {

    var nav = new Nav(document.getElementsByClassName('nav-single')[0]);

    $('.PlaceholderLabel').placeholderLabel();

    $('select').each(function() {
      var listbox = new Listbox(this);

      $(this).siblings('button').click(function(e) {
        e.preventDefault();
        if (listbox.disabled) {
          listbox.enable();
          this.textContent = 'Disable';
        } else {
          listbox.disable();
          this.textContent = 'Enable';
        }
      });
    });

    $('form').on('submit', function(e) {
      e.preventDefault();
      window.alert($(this).serialize());
    });

  });

});