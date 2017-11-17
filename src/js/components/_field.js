import { ACTIVE } from '../_constants';

;(() => {
  const $field = $('.js-field');

  $field.each(function() {
    const $this = $(this);
    const $input = $this.find('.js-field-input');
    $input
      .focus(e => {
        $this.addClass(ACTIVE);
      })
      .blur(e => {
        if (!$input.val().length) $this.removeClass(ACTIVE);
      });
  });
})();
