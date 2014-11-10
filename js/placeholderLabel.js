/* -----------------------------------------------------------------------------
  placeholderLabel
----------------------------------------------------------------------------- */
;(function() {

  // Private
  function _manageLabel() {
    if (this.el.value) {
      this.$label.addClass('is-displayed');
    } else {
      this.$label.removeClass('is-displayed');
    }
  }

  // Constructor
  function placeholderLabel(element, options) {
    this.el = element;
    this.$el = $(this.el);
    this.$label = $('label[for=' + this.el.id + ']');

    if (!this.$label.length) {
      if (this.el.placeholder) {
        this.$label = $('<label class="PlaceholderLabel-label" for="'+ this.el.id +'">' + this.el.placeholder + '</label>')
          .insertBefore(this.el);
      } else return;
    }

    this.el.placeholder = this.el.placeholder || this.$label.text();

    this.init();
  }

  // Public
  placeholderLabel.prototype = {
    init: function() {
      var self = this;

      this.$el.add(this.$label).wrapAll('<div class="PlaceholderLabel-wrapper" />');

      this.$el.on('keyup', _manageLabel.bind(this));

      _manageLabel.call(this);
    }
  };

  // jQuery plugin definition
  $.fn.placeholderLabel = function(options) {
    return this.each(function() {
      new placeholderLabel(this, options);
    });
  };

})();