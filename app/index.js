

$(document).ready(function(){
  Form.init();
});

// --- Revealing Module Pattern ---
var Form = (function () {
  // Private Function
  var _setHandlers = function() {

    // Event Handler - Home / Business Radio Button
    $('.order-form').on('change', '.address-type', function(){
      var action = ( $(this).val() === 'business' ) ? $('.company-name').removeClass('hide') : $('.company-name').addClass('hide');
    });

    // Event Handler - Home / Business Radio Button
    $('.order-form').on('blur', '.confirm-email', function(){
      var $this = $(this);

      if($this.val() !== $('.email').val()) {
        $this.addClass('error');
        return;
      }

      $this.removeClass('error');

    });

  };

  // Public Function
  var init = function() {
    _setHandlers();
  };

  return {
    init: init
  };

})();
