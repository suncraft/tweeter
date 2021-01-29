/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


 //tries to get you back to where you were
 //after submitting a tweet
const backToPosition = function(position) {
  console.log(`This is the position: ${position}`);
    window.scrollTo(0, position);
};


const focusTextarea = function() {
  $('#tweet-text').focus();
}

// $( "#tweet-text" ).click(function() {
//   backToPosition(0)
//   focusTextarea()
// });

//main callback listener:
$(document).ready(function() {

  //form listener
  $(function() {
    const $button = $('form');
    $button.on('submit', function (event) {
      event.preventDefault();
      let height = $(window).scrollTop();
      console.log('Button clicked, performing ajax call: ');
      let formData = decodeURI($(this).serialize());

      //ERROR HANDLING
      if (formData.length <= 5) {
        $('.formError').text(`Error! Enter some text`);
        return $('.formError').css("left", "2rem");
      }
      if (formData.length > 145) {
        $('.formError').text(`Error! Too many characters`);
        return $('.formError').css("left", "2rem");
      }
      
      //success continues original functions
      console.log(`There was: ${formData.length - 5} character(s) entered.`);
      $('.formError').css("left", "-700px");
      
      //call to input to server
      $.ajax({
        url: '/tweets', 
        method: 'POST',
        data: formData})
      //reload all tweets with new tweet
      .then(function (data) {
        console.log('Success: ', data);
        $(".tweets").children().replaceWith(loadTweets());
      })
      //scoll back to position after arbitrary delay
      .then(function() {
        setTimeout(function (){
          backToPosition(height);
        }, 500);
      })
      //reset textarea
      .then(function() {
        $('#tweet-text').val('');
      });
    });
  });

//original loadtweet call
const loadTweets = function() {
  $.ajax({
    url: `/tweets`,
    method: `GET`,
    dataType: `JSON`
  })
  .then(function (data) {
    console.log(`LoadTweets Success: `, data);
    renderTweets(data);
  });
};

// loops through tweets from server
const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    $('.tweets').append(createTweetElement(tweet));
  }
};

// make cross site attacks unlikely
const escape =  function(str) {
  let paragraph = document.createElement('p');
  paragraph.appendChild(document.createTextNode(str));
  return paragraph.innerHTML;
};

//tweet template
const createTweetElement = function(tweet) {
  let $tweet = `
  <article>
    <div class="tweet-header">
      <h5><img src="${tweet.user.avatars}">${tweet.user.name}</h5>
      <span class="faded">${tweet.user.handle}</span>
    </div>
      <p>${escape(tweet.content.text)}</p>
    <footer>
      <span class="tweetDate">${Math.floor(((Date.now() - tweet.created_at) / 1000 / 60 / 60) / 24)} days ago</span>
      <span class="tweetIcons">
        <svg class="icon">
        <use xlink:href="#flags" />
        </svg>
        <svg class="icon">
        <use xlink:href="#retweet" />
        </svg>
        <svg class="icon">
        <use xlink:href="#like" />
        </svg>
      </span>
    </footer>
  </article>
  `
  return $tweet;
}

//on page load: 
renderTweets(loadTweets());
focusTextarea();
});



$( "#tweet-text" ).click(function() {
  backToPosition(0);
  focusTextarea();
});