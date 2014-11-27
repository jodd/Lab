/* ==========================================================================
   Selectbox
   ========================================================================== */

define(['jquery'], function ($) {
  "use strict";

  var defaults = {};

  // Private
  function _makeList(tag, object) {
    var list = document.createElement(tag), node, link, text;
    $(object).find('*').each(function() {
      node = document.createElement('li');
      if (this.tagName.toLowerCase() === 'optgroup') {
        node.className = 'Selectbox-optgroup';
        text = document.createTextNode(this.label);
        node.appendChild(text);
      }
      if (this.tagName.toLowerCase() === 'option') {
        node.className = 'Selectbox-option';
        link = document.createElement('a');
        text = document.createTextNode(this.textContent);
        link.appendChild(text);
        node.appendChild(link);
      }
      list.appendChild(node);
    });
    return list;
  }

  // Constructor
  function Selectbox(element, options) {
    this.options = $.extend({}, defaults, options);

    this.el = element;
    this.$el = $(this.el);

    this.init();
  }

  // Public
  Selectbox.prototype = {
    init: function () {
      var self = this;

      this.box = this.$el.wrap(document.createElement('div'))
        .parent().addClass('Selectbox')[0];

      this.list = this.box.insertBefore(_makeList('ul', this.el), this.el);
      this.$list = $(this.list).addClass('Selectbox-list');

      this.options = $(this.list).children('.Selectbox-option').toArray();
      this.optgroups = $(this.list).children('.Selectbox-optgroup').toArray();

      this.control = $('<span>', {
          class: 'Selectbox-control',
          text: this.el.options[this.el.selectedIndex].textContent
        })
        .prependTo(this.box)[0];

      this.$list.on('click', 'a', function() {
        self.update(this);
      });

      document.body.addEventListener('click', function(e) {
        if(e.target === self.control) {
          $(self.box).toggleClass('is-open');
        } else if (self.optgroups.indexOf(e.target) === -1) {
          $(self.box).removeClass('is-open');
        }
      });

    },
    update: function(element) {
      this.control.textContent = element.textContent;
      this.el.selectedIndex = this.options.indexOf(element.parentNode);
    }
  };

  // jQuery plugin definition
  $.fn.selectbox = function (options) {
    return this.each(function () {
      new Selectbox(this, options);
    });
  };

});