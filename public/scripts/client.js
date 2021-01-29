/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const data = [
//     {
//       "user": {
//         "name": "Newton",
//         "avatars": "https://i.imgur.com/73hZDYK.png",
//         "handle": "@SirIsaac"
//       },
//       "content": {
//         "text": "If I have seen further it is by standing on the shoulders of giants"
//       },
//       "created_at": 1611534648221
//     },
//     {
//       "user": {
//         "name": "Descartes",
//         "avatars": "https://i.imgur.com/nlhLi3I.png",
//         "handle": "@rd"
//       },
//       "content": {
//         "text": "Je pense , donc je suis"
//       },
//       "created_at": 1611621048221
//     },
//     {"user":{"name":"Cordelia Bird","handle":"@Bird","avatars":"https://i.imgur.com/nlhLi3I.png"},"content":{"text":"This is test #1"},"created_at":1611784491891},
  
//     {"user":{"name":"Travis Leonard","handle":"@Leonard67","avatars":"https://i.imgur.com/2WZtOD6.png"},"content":{"text":"This is test #2#########"},"created_at":1611784531515}
// ]

// $(window).scroll(function() {
//   let height = $(window).scrollTop();
// });

// $(document).ready(function(){
//   $("button").click(function(){
//     $(document).scrollTop(100);
//   });
// });

// <script>alert("Uh Oh!");</script>

//not working... ##############
// $.when( $(".tweets").children().replaceWith(loadTweets()) ).then(backToPosition(height));
const backToPosition = function(position) {
  console.log(`This is the position: ${position}`);
  // $(document.body).scrollTop(position);
    window.scrollTo(0, position);
};

// setTimeout(function (){

//   // Something you want delayed.

// }, 1000);

// ################

$(document).ready(function() { //ENTER READY

  //adjusting and testing AJAX call
  $(function() {
    const $button = $('form');
    
    $button.on('submit', function (event) {
      event.preventDefault();
      let height = $(window).scrollTop();
      // console.log(event);
      console.log('Button clicked, performing ajax call: ');
      let formData = decodeURI($(this).serialize());

      //ERROR HANDLING
      if (formData.length <= 5) {
        $('.formError').text(`Error! Enter some text`)
        return $('.formError').css("left", "2rem");
      }
      if (formData.length > 145) {
        $('.formError').text(`Error! Too many characters`)
        return $('.formError').css("left", "2rem");
      }
      
      console.log(`There was: ${formData.length - 5} character(s) entered.`);
      $('.formError').css("left", "-700px");
      
      $.ajax({
        url: '/tweets', 
        method: 'POST',
        data: formData})
      .then(function (data) {
        console.log('Success: ', data);
        // $('.tweets').children.remove();
        // let height = $(window).scrollTop();
        // $(".tweets").children().replaceWith(loadTweets());
        $(".tweets").children().replaceWith(loadTweets())
      })
      
      .then(function() {
        setTimeout(function (){
          backToPosition(height);
        
        }, 500);
        // console.log(height);
      })
      .then(function() {
        $('#tweet-text').val('');
      })
    });
  });

const loadTweets = function() {
  $.ajax({
    url: `/tweets`,
    method: `GET`,
    dataType: `JSON`
  })
  .then(function (data) {
    console.log(`LoadTweets Success: `, data);
    renderTweets(data);
  })
}

const renderTweets = function(tweets) {
  // loops through tweets
  //technically works????
  // tweets.forEach(tweet => {
  //   $('.tweets').append(createTweetElement(tweet));
  // }); 

  for (const tweet of tweets) {
    // calls createTweetElement for each tweet
    $('.tweets').append(createTweetElement(tweet));
    // takes return value and appends it to the tweets container
  }
}

// $text(tweet.content.text)

const escape =  function(str) {
  let paragraph = document.createElement('p');
  paragraph.appendChild(document.createTextNode(str));
  return paragraph.innerHTML;
}

const createTweetElement = function(tweet) {
  // let safeHTML = $.text($(tweet.content.text))
  // let safeHTML = $("<p>").text($(tweet.content.text));
  // console.log(safeHTML);
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

// console.log(typeof loadTweets());
renderTweets(loadTweets());
// backToPosition(203);
// res.setHeader("Content-Security-Policy", "script-src http://localhost:8080")
});


// const beer = {
//   name: 'Belgian Wit',
//   brewery: `Steam Whistle Brewery`,
//   keywords: ['pale', 'cloudy', 'spiced', 'crisp']
// };
// const markup = `
// <div class="beer">
//   <h2>${beer.name}</h2>
//   <p class="brewery">${beer.brewery}
// </div>
// `;
// document.body.innerHTML = markup;

// const beer = {
//   name: 'Belgian Wit',
//   brewery: `Steam Whistle Brewery`,
//   keywords: ['pale', 'cloudy', 'spiced', 'crisp']
// };
// function renderKeywords(keywords) {
//   return `
  
//       ${keywords.map(keyword => `* ${keyword}
// `)}
  
//   `;
// }
// const markup = `
// <div class="beer">
//   <h2>${beer.name}</h2>
//   <p class="brewery">${beer.brewery}
//   ${renderKeywords(beer.keywords).join('')}
// </div>
// `;
// document.body.innerHTML = markup;


//content with ??? in it doesn't work

// {"user":
// {
//   "name":"Descartes",
//   "avatars":"https://i.imgur.com/nlhLi3I.png",
//   "handle":"@rd"},
//   "content":
//   {"text":"Je pense , donc je suis"},
//   "created_at":1611805652481,
// }

// {"user":
// {
//   "name":"Tillie Yamada",
//   "handle":"@Yamada37",
//   "avatars":"https://i.imgur.com/3GvwNBf.png"},
//   "content":
//   {"text":"okay"},
//   "created_at":1611892586411
// }

// {"user":
// {
//   "name":"Lou Kelly",
//   "handle":"@MissKelly",
//   "avatars":"https://i.imgur.com/v0JXau2.png"
// },
// "content":
//   {"text":"???"},
//   "created_at":1611892059385},

// {"user":
// {
//   "name":"Mitchell Maggini",
//   "handle":"@DrMaggini",
//   "avatars":"https://i.imgur.com/ilT4JDe.png"},
// "content":
//   {"text":"s"},
//   "created_at":1611892064810
// }
