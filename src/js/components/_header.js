import { WIN, BODY, HTMLBODY, FIXED, ACTIVE } from '../_constants';
import { SCROLL_WIDTH } from './_scrollWidth';

;(() => {

  const $header = $('.js-header');
  const $headerInner = $('.js-header-inner');

  //START HEADER ON SCROLL
  const duration = 200;
  let shown = false;
  let hidden = false;
  let positionTop;
  let scrollTop;

  const setHeader = position => $headerInner.css({
    '-webkit-transform': `translate3d(0,${position-100}%,0)`,
    'transform': `translate3d(0,${position-100}%,0)`
    // 'margin-top': position*($header.outerHeight()/100)-$header.outerHeight()/100 + 'px'
  });
  
  const toggleHeader = () => {
    
    scrollTop = WIN.scrollTop();
    const distance = $header.outerHeight() * 2;
    const conditionDistance = scrollTop > distance;

    if (conditionDistance && !shown) {
      shown = true;
      $headerInner.css({
        '-webkit-transform': 'translate3d(0,-100%,0)',
        'transform': 'translate3d(0,-100%,0)'
      });
      $header
        .addClass(FIXED)
        .stop(true,true,true)
        .animate({
          counter: 100
        }, {
          duration: duration,
          step: now => setHeader(now),
          complete: () => {
            hidden = false;
          }
        });
    } else if (!conditionDistance && shown && !hidden) {
      hidden = true;
      $header
        .stop(true,true,true)
        .animate({
          counter: 0
        }, {
          duration: duration,
          step: now => setHeader(now),
          complete: () => {
            shown = false;
            $('.header__inner').css({
              '-webkit-transform': 'translate3d(0,0,0)',
              'transform': 'translate3d(0,0,0)'
            });
            $header
              .removeClass(FIXED);
          }
        });
    }

  };

  const resetMenu = () => {
    // CLEAR CSS FOR HEADER AND BODY 
    BODY.css({
      'paddingRight': 0,
      'position': 'relative'
    });
    $header
      .css('right', 0)
      .removeClass(ACTIVE);

    // SET SCROLL POSITION
    HTMLBODY.scrollTop(positionTop);
  };

  toggleHeader();
  WIN.on({
    'scroll': toggleHeader,
    'resize': () => !window.matchMedia('(max-width: 767px)').matches && resetMenu()
  });
  //END HEADER ON SCROLL

  //START SHOW NAV
  const $navBtn = $('.js-nav-btn');
  const HIDDEN = 'is-hidden';
  $navBtn.on('click', e => {
    e.preventDefault();
    if (!$header.hasClass(ACTIVE)) {
      // DESTROY setHeader()
      shown = false;
      
      // SHOW MENU
      $header.addClass(ACTIVE);
      
      // SET CSS FOR HEADER AND BODY 
      setTimeout(() => {
        $header.css('right', SCROLL_WIDTH());
        BODY.css({
          'paddingRight': SCROLL_WIDTH(),
          'position': 'fixed'
        });
      }, 400);
      
      // GET LAST SCROLL POSITION
      positionTop = scrollTop;
    }
    else {
      resetMenu();
    }
  });
  //END SHOW NAV

  const $contactUs = $('.js-contact-us');
  $contactUs.on('click', e => {
    e.preventDefault();
    if ($header.hasClass(ACTIVE)) $navBtn.trigger('click');
  });

})();
