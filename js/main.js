//

requirejs.config({
  baseUrl: "js",
  paths: {
    "jquery": "../bower_components/jquery/dist/jquery",
    "placeholderLabel": "placeholderLabel"
  }
});


//

require(['jquery', 'placeholderLabel'], function() {

  "use strict";

  $(document).ready(function() {
    $('.PlaceholderLabel').placeholderLabel();
  });

});