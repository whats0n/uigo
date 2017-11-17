import { WIN, BODY, FIXED, ACTIVE } from '../_constants';

;(() => {

  const $header = $('.js-header');

  //START HEADER ON SCROLL
  const duration = 200;
  let shown = false;
  let hidden = false;

  const setHeader = position => $header.css({
    '-webkit-transform': `translate3d(0,${position-100}%,0)`,
    'transform': `translate3d(0,${position-100}%,0)`
    // 'margin-top': position*($header.outerHeight()/100)-$header.outerHeight()/100 + 'px'
  });
  
  const toggleHeader = () => {
    
    const scrollTop = WIN.scrollTop();
    const distance = $header.outerHeight() * 2;
    const conditionDistance = scrollTop > distance;

    if (conditionDistance && !shown) {
      shown = true;
      $header
        .css({
          '-webkit-transform': 'translate3d(0,-100%,0)',
          'transform': 'translate3d(0,-100%,0)'
        })
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
            $header
              .css({
                '-webkit-transform': 'translate3d(0,0,0)',
                'transform': 'translate3d(0,0,0)'
              })
              .removeClass(FIXED);
          }
        });
    }

  };

  toggleHeader();
  WIN.on('scroll', toggleHeader);
  //END HEADER ON SCROLL

  //START SHOW NAV
  const $navBtn = $('.js-nav-btn');
  const HIDDEN = 'is-hidden';
  $navBtn.on('click', e => {
    e.preventDefault();
    $header.toggleClass(ACTIVE);
    BODY.toggleClass(HIDDEN);
  });
  //END SHOW NAV

})();
