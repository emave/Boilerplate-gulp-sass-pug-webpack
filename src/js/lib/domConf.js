window.DOM = {
  body: document.querySelector('body.body'),
  html: document.documentElement,
  isPageY: window.pageY || false,
  ua: navigator.userAgent.toLowerCase(),
  passiveSupported: false,
  bodyScrollTop: null,
  scrollWidth: null,
  scriptMap: null,
  debounce: (func, wait, immediate) => {
    let timeout;
    return () => {
      let context = this, args = arguments;
      let later = () => {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      let callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  },
  getScrollWidth: function() {
    // Узнаем ширину скролл панели
    const div = document.createElement('div');
    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.visibility = 'hidden';
    this.html.appendChild(div);
    this.scrollWidth = div.offsetWidth - div.clientWidth;
    this.html.removeChild(div);
  },
  checkPassive: function() {
    try {
      let options = Object.defineProperty({}, 'passive', {
        get: () => {
          window.DOM.passiveSupported = true;
        }
      });
      window.addEventListener('test', null, options);
    } catch(err) {}
  },
  hideScroll: function() {
    if (this.body.offsetHeight < this.body.scrollHeight) {
      this.body.paddingRight = this.scrollWidth + 'px';
    }
    this.bodyScrollTop = window.pageYOffset;
    this.body.style.top = -this.bodyScrollTop + 'px';
    window.scroll(0, this.bodyScrollTop);
  },
  hideScrollSimple: function() {
    if (this.body.offsetHeight < this.body.scrollHeight) {
      this.body.paddingRight = this.scrollWidth + 'px';
    }
  },
  passiveOrNot: () => {
    return window.DOM.passiveSupported ? { passive: true } : false;
  },
  showScroll: function() {
    this.bodyScrollTop && (window.scroll(0, this.bodyScrollTop));
    this.bodyScrollTop = null;
    this.body.style.paddingRight = '';
    // for sticky-kit
    //if(this.stick) this.stick.trigger('sticky_kit:recalc');
  },
  showScrollSimple: function() {
    this.body.style.paddingRight = this.scrollWidth + 'px';
  },
  addListenerMulti(el, s, fn) {
    s.split(' ').forEach(e => el.addEventListener(e, fn, window.DOM.passiveOrNot()));
  },
  getStyle: (el, style) => window.getComputedStyle ? getComputedStyle(el, style) : el.currentStyle,
  fireEvent: (node, eventName) => {
    let doc;
    if (node.ownerDocument) {
      doc = node.ownerDocument;
    } else if (node.nodeType === 9) {
      doc = node;
    } else {
      throw new Error('Invalid node passed to fireEvent: ' + node.id);
    }

    if (node.dispatchEvent) {
      let eventClass = '';
      switch (eventName) {
        case 'click': // Dispatching of 'click' appears to not work correctly in Safari. Use 'mousedown' or 'mouseup' instead.
        case 'mousedown':
        case 'mouseup':
          eventClass = 'MouseEvents';
          break;
        case 'focus':
        case 'change':
        case 'blur':
        case 'select':
          eventClass = 'HTMLEvents';
          break;
        default:
          throw "fireEvent: Couldn't find an event class for event '" + eventName + "'.";
          break;
      }
      let event = doc.createEvent(eventClass);
      event.initEvent(eventName, true, true);
      event.synthetic = true;
      node.dispatchEvent(event, true);
    }
  }
};
