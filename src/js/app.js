import './lib/domConf';
import imagesLoaded from 'imagesloaded';


let version = detectIE();
version ? window.DOM.isIe = true : window.DOM.isIe = false;
function detectIE() {
  let ua = window.navigator.userAgent;
  // Test values; Uncomment to check result …

  // IE 10
  // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

  // IE 11
  // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

  // Edge 12 (Spartan)
  // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

  // Edge 13
  // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';
  let msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }
  let trident = ua.indexOf('Trident/');
  if (trident > 0) {
    let rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }
  let edge = ua.indexOf('Edge/');
  if (edge > 0) {
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }
  return false;
}

window.onload = () => {


  setTimeout(() => {
    window.DOM.getScrollWidth();
    window.DOM.checkPassive();


    //Anchors
    Math.easeInOutQuad = function(t, b, c, d) {
      t /= d/2;
      if (t < 1) return c/2*t*t + b;
      t--;
      return -c/2 * (t*(t-2) - 1) + b;
    };
    function scrollToto(element, to, duration) {
      let start = element.scrollTop,
        change = to - start,
        currentTime = 0,
        increment = 20;

      let animateScroll = function() {
        currentTime += increment;
        let val = Math.easeInOutQuad(currentTime, start, change, duration);
        element.scrollTop = val;
        if(currentTime < duration) {
          setTimeout(animateScroll, increment);
        }
      };
      animateScroll();
    }

    if (window.DOM.ua.indexOf('safari') !== -1) {
      if(window.DOM.ua.indexOf('chrome') > -1) {
        window.DOM.scrollToTopElement = document.documentElement;
      }
      else{
        window.DOM.scrollToTopElement = document.body;
      }
    }
    else{
      window.DOM.scrollToTopElement = document.documentElement;
    }
    window.DOM.scrollToTop = () => scrollToto(window.DOM.scrollToTopElement, 0, 0);

    imagesLoaded(document.body, () => demo.spinner.setComplete());

    window.DOM.body.classList.add('loaded');
  }, 100);

};
