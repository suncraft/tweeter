


$(document).ready(function() {
  $("textarea").keyup(function() {
    let value = $(this).val().length;
    $(".counter").text(140 - value)
    let charsCounter = $(".counter").val(); //assign AFTER change
    if (charsCounter >= 0) {
      $(".counter").css('color', 'inherit');
    }
    if (charsCounter < 0) {
      $(".counter").css('color', 'red');
    }
  })

});
