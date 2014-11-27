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
  'placeholderLabel',
  'selectbox'
], function ($) {

  "use strict";

  $(document).ready(function () {
    $('.PlaceholderLabel').placeholderLabel();
    $('.Selectbox-select').selectbox();
  });

});