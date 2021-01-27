

$(document).ready(function() {
  console.log("for char counter: ");

  // $(".enteredToTweet").addEventListener("keydown", (event) => {
  //   console.log(event);
  // });

  $("textarea").keyup(function() {
    let value = $(this).val().length;
    $(".counter").text(140 - value)
    // if (.text < 0) {
    //   $("")
    // }
  })

  // $(".enteredToTweet").on("keydown", function(event) {
  //   console.log(this.value.length);
  //   console.log(event);
  //   $(".counter").val()
  // })


});

//working examples: 

// $("textarea").keydown(function() {
//   let value = $(this).val().length;
//   $(".counter").text(value)
// })

// $( "input" )
//   .keyup(function() {
//     var value = $( this ).val();
//     $( "p" ).text( value );
//   })
//   .keyup();
