/* -----------------------------------------------------------------------------
  placeholderLabel
----------------------------------------------------------------------------- */
;(function() {

  function manageLabel() {
    if (this.el.value) {
      this.$label.addClass('is-displayed');
    } else {
      this.$label.removeClass('is-displayed');
    }
  }

  // Constructor
  function placeholderLabel(element, options) {console.log('constructor');
    this.el = element;
    this.$el = $(this.el);
    this.$label = $('label[for=' + this.el.id + ']').addClass('PlaceholderLabel-label');

    if (!this.$label.length) {
      if (this.el.placeholder) {
        this.$label = $('<label class="PlaceholderLabel-label" for="'+ this.el.id +'">' + this.el.placeholder + '</label>')
          .insertBefore(this.el);
      } else return;
    }

    this.el.placeholder = this.el.placeholder || this.$label.text();

    this.init();
  }

  // Public functions
  placeholderLabel.prototype = {
    init: function() {console.log('init');
      var self = this;

      this.$el.add(this.$label).wrapAll('<div class="PlaceholderLabel-wrapper" />');

      this.$el.on('keyup', manageLabel.bind(this));

      manageLabel.call(this);
    }
  };

  // jQuery plugin definition
  $.fn.placeholderLabel = function(options) {
    return this.each(function() {
      new placeholderLabel(this, options);
    });
  };

})();


/* -----------------------------------------------------------------------------
  Document initialized
----------------------------------------------------------------------------- */

$(document).ready(function() {
  $('.PlaceholderLabel').placeholderLabel();
});