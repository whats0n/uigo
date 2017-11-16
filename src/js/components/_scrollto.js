import { SCROLL_TO } from '../_utils';

;(() => {

  const $goto = $('[data-goto]');
  const $section = $('[data-section]');

  $goto.on('click', e => {

  	e.preventDefault();

    const $target = $(e.target);
    const to = $target.data('goto');
    const $currentSection = $section.filter(`[data-section="${to}"]`);
    
    $currentSection.length && SCROLL_TO(currentSection.offset().top);

  });

})();
