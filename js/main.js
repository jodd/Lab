//

require.config({
  baseUrl: 'js',
  paths: {
    jquery: '../bower_components/jquery/dist/jquery',
    // placeholderLabel: 'placeholderLabel',
    // selectbox: 'selectbox'
  }
});


//

require([
  'jquery',
  'listbox',
  'placeholderLabel'
], function ($, Listbox) {
  "use strict";

  $(document).ready(function () {
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