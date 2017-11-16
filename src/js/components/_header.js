import { WIN, FIXED } from '../_constants';

;(() => {

  const $header = $('.js-header');
  const duration = 200;
  const easing = 'easeinout';
  let shown = false;
  let hidden = false;
  let counter = 0;

  WIN.on('scroll', e => {
		
    const scrollTop = WIN.scrollTop();
    const height = $header.outerHeight() * 2;

    if (scrollTop > height && !shown) {
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
    			step: now => $header.css({
    				'-webkit-transform': `translate3d(0,${now-100}%,0)`,
    				'transform': `translate3d(0,${now-100}%,0)`
    			}),
    			complete: () => {
    				hidden = false;
    			}
    		});
    } else if (scrollTop <= height && shown && !hidden) {
    	hidden = true;
    	$header
    		.stop(true,true,true)
    		.animate({
    			counter: 0
    		}, {
    			duration: duration,
    			step: now => $header.css({
    				'-webkit-transform': `translate3d(0,${now-100}%,0)`,
    				'transform': `translate3d(0,${now-100}%,0)`
    			}),
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

  });

})();
