import { WIN, FIXED } from '../_constants';

;(() => {

  const $header = $('.js-header');
  const duration = 200;
  let shown = false;
  let hidden = false;

  const setHeader = position => $header.css({
    '-webkit-transform': `translate3d(0,${position-100}%,0)`,
    'transform': `translate3d(0,${position-100}%,0)`
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

})();
