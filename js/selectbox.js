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
        link.setAttribute('data-icon', '\ue603')
        link.tabIndex = 1;
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
    this.$el = $(this.el).attr('tabindex', -1);

    this.init();
  }

  // Public
  Selectbox.prototype = {
    init: function () {
      var self = this;

      this.isOpen = false;

      this.box = this.$el.wrap(document.createElement('div'))
        .parent().addClass('Selectbox')[0];

      this.control = $('<span>', {
          class: 'Selectbox-control',
          'data-icon': '\ue602',
          'tabindex': 0,
          text: this.el.options[this.el.selectedIndex].textContent
        })
        .on('keydown', function(e) {
          // 32 = SPACE, 40 = DOWN ARROW
          if ([32, 40].indexOf(e.keyCode) > -1) {
            self.open();
          }
        }).prependTo(this.box)[0];

      this.list = this.box.insertBefore(_makeList('ul', this.el), this.el);

      this.$list = $(this.list).addClass('Selectbox-list')
        .on('click', 'a', function() {
          self.update(this);
        })
        .on('keydown', function(e) {
          var index = self.options.indexOf(e.target);

          // 9 = TAB
          if (e.keyCode === 9) { return false; }
          // 38 = UP ARROW
          else if (e.keyCode === 38 && index) {
            self.options[index - 1].focus();
          }
          else if (e.keyCode === 40 && ++index !== self.options.length) {
            self.options[index].focus();
          }
          else if (e.keyCode === 32) {
            self.update(e.target);
            self.close();
          }
        });

      this.options = $(this.list).find('.Selectbox-option a')
        .on('mouseover', function() {
          self.options[self.el.selectedIndex].blur();
        }).toArray();

      $(this.options[this.el.selectedIndex]).addClass('is-selected');

      this.optgroups = $(this.list).children('.Selectbox-optgroup').toArray();

      document.documentElement.addEventListener('click', function(e) {
        if(e.target === self.control) {
          self.toggle();
        } else if (self.optgroups.indexOf(e.target) === -1) {
          self.close();
        }
      });

      document.documentElement.addEventListener('keydown', function(e) {
        // console.log(e.keyCode);
        // 27 = ESC
        if (e.keyCode === 27) {
          self.close();
        }
      });

    },
    open: function() {
      if (!this.isOpen) {
        $(this.box).addClass('is-open');
        this.$list.find('a')[this.el.selectedIndex].focus();
        this.isOpen = true;
      }
    },
    close: function() {
      if (this.isOpen) {
        $(this.box).removeClass('is-open');
        this.control.focus();
        this.isOpen = false;
      }
    },
    toggle: function() {
      return this.isOpen ? this.close() : this.open();
    },
    update: function(element) {
      this.control.textContent = element.textContent;
      this.el.selectedIndex = this.options.indexOf(element);
      $(this.options).removeClass('is-selected');
      $(element).addClass('is-selected');
    }
  };

  // jQuery plugin definition
  $.fn.selectbox = function (options) {
    return this.each(function () {
      new Selectbox(this, options);
    });
  };

});