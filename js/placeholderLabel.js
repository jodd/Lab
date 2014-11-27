/* ==========================================================================
   placeholderLabel
   ========================================================================== */

define(['jquery'], function ($) {
  "use strict";

  var defaults = {};

  // Private
  function _manageLabel() {
    if (this.el.value) {
      this.$label.addClass('is-displayed');
    } else {
      this.$label.removeClass('is-displayed');
    }
  }

  // Constructor
  function PlaceholderLabel(element, options) {
    this.options = $.extend({}, defaults, options);

    this.el = element;
    this.$el = $(this.el);
    this.$label = $('label[for=' + this.el.id + ']');

    if (!this.$label.length) {
      if (this.el.placeholder) {
        this.$label = $('<label class="PlaceholderLabel-label" for="' + this.el.id + '">' + this.el.placeholder + '</label>').insertBefore(this.el);
      } else { 
        return;
      }
    }

    this.el.placeholder = this.el.placeholder || this.$label.text();
    this.init();
  }

  // Public
  PlaceholderLabel.prototype = {
    init: function () {
      this.$el.add(this.$label).wrapAll('<div class="PlaceholderLabel-wrapper" />');
      this.$el.on('keyup', _manageLabel.bind(this));
      _manageLabel.call(this);
    }
  };

  // jQuery plugin definition
  $.fn.placeholderLabel = function (options) {
    return this.each(function () {
      new PlaceholderLabel(this, options);
    });
  };

});