/* ==========================================================================
   Listbox
   ========================================================================== */

define(['jquery'], function ($) {
  "use strict";

  var defaults = {
    keypressDelay: 1200
  };

  // Private
  function _makeList(tag, object) {
    var list = document.createElement(tag), node, text;
    list.setAttribute('aria-hidden', 'true');
    $(object).find('*').each(function() {
      node = document.createElement('li');
      if (this.tagName.toLowerCase() === 'optgroup') {
        node.setAttribute('role', 'separator');
        text = document.createTextNode(this.label);
      }
      if (this.tagName.toLowerCase() === 'option') {
        node.setAttribute('role', 'option');
        node.tabIndex = 1;
        text = document.createTextNode(this.textContent);
      }
      node.appendChild(text);
      list.appendChild(node);
    });
    return list;
  }

  // Constructor
  function Listbox(element, options) {
    this.options = $.extend({}, defaults, options);

    this.el = element;
    // original select element is no longer focusable
    this.el.setAttribute('tabindex', '-1');

    // default state is closed
    this.isOpen = false;

    this.timer = 0;
    this.input = '';

    this.init();
  }

  // Public
  Listbox.prototype = {
    init: function () {
      var self = this;

      // create wrapper
      this.$box = $('<div>', {
          'role': 'listbox',
          'aria-expanded': 'false',
          'tabindex': 0
        }).insertBefore(this.el)
        // provide some keyboard control
        .on('keydown.listbox', this.onKeydown.bind(this))
        .on('keypress.listbox', this.onKeypress.bind(this));

      // create control element
      this.$control = $('<span>', {
        text: this.el.options[this.el.selectedIndex].textContent
      }).appendTo(this.$box);

      // create & insert the list of options
      this.$list = $(_makeList('ul', this.el)).appendTo(this.$box);

      // cache links that stand for options
      this.$options = this.$list.children('[role="option"]')
        // always have only one option focused/hovered
        .on('mouseover', function() { this.focus(); })
        .on('click', function() {
          self.update(self.$options.index(this));
        });

      // set the default selected option
      this.$options.eq(this.el.selectedIndex).attr('aria-selected', 'true');

      // cache items that stand for optgroups
      this.$optgroups = this.$list.children('[role="separator"]');

      $(document.documentElement).on('click.listbox', function(e) {
        if(e.target === self.$control[0]) {
          self.toggle();
        } else if (self.$optgroups.index(e.target) === -1) {
          self.close();
        }
      });

    },
    open: function() {
      if (!this.isOpen) {
        this.$box.attr('aria-expanded', 'true');
        this.$list.attr('aria-hidden', 'false');
        this.$options.eq(this.el.selectedIndex).focus();
        this.isOpen = true;
      }
      return this;
    },
    close: function() {
      if (this.isOpen) {
        this.$box.attr('aria-expanded', 'false');
        this.$list.attr('aria-hidden', 'true');
        this.isOpen = false;
      }
      return this;
    },
    toggle: function() {
      return this.isOpen ? this.close() : this.open();
    },
    update: function(index) {
      var $element = this.$options.eq(index);
      this.$control.text($element.text());
      this.el.selectedIndex = index;
      this.$options.attr('aria-selected', 'false');
      $element.attr('aria-selected', 'true');
      return this;
    },
    onKeydown: function(e) {
      var index = this.isOpen ? this.$options.index(e.target) : this.el.selectedIndex;
      switch (e.keyCode) {
        case 9: // TAB
          if (this.isOpen) { return false; }
          break;
        case 32: // SPACE
          if (this.isOpen) {
            this.update(index).$box.focus();
          }
          this.toggle();
          break;
        case 38: // UP ARROW
          if (index--) {
            if (this.isOpen) {
              this.$options[index].focus();
            } else {
              this.update(index);
            }
          }
          break;
        case 40: // DOWN ARROW
          if (++index !== this.$options.length) {
            if (this.isOpen) {
              this.$options[index].focus();
            } else {
              this.update(index);
            }
          }
          break;
        case 27: // ESC
          if (this.isOpen) {
            this.close();
            this.$box.focus();
          }
      }
      return this;
    },
    onKeypress: function(e) {
      if (!e.charCode) { return this; }

      // concatenate input if pressed within delay
      this.input = Date.now() - this.timer < this.options.keypressDelay ?
        this.input + e.key :
        e.key;

      // update timer
      this.timer = Date.now();

      // update listbox (if closed) or focus proper item if the user input matches any option
      for (var i = 0 ; i < this.$options.length ; i++) {
        if (this.$options.eq(i).text().substr(0, this.input.length).toLowerCase() === this.input) {
          if (this.isOpen) {
            this.$options[i].focus();
          } else {
            this.update(i);
          }
          return this;
        }
      }
      return this;
    }
  };

  // jQuery plugin definition
  $.fn.listbox = function (options) {
    return this.each(function () {
      new Listbox(this, options);
    });
  };

});