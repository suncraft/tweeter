/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1611534648221
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1611621048221
    },
    {"user":{"name":"Cordelia Bird","handle":"@Bird","avatars":"https://i.imgur.com/nlhLi3I.png"},"content":{"text":"This is test #1"},"created_at":1611784491891},
  
    {"user":{"name":"Travis Leonard","handle":"@Leonard67","avatars":"https://i.imgur.com/2WZtOD6.png"},"content":{"text":"This is test #2#########"},"created_at":1611784531515}
]


$(document).ready(function() {

const renderTweets = function(tweets) {
  // loops through tweets
  for (const tweet of tweets) {
    // calls createTweetElement for each tweet
    $('.tweets').append(createTweetElement(tweet));
  }
  // takes return value and appends it to the tweets container
}

const createTweetElement = function(tweet) {
  let $tweet = `
  <article>
    <div class="tweet-header">
      <h5><img src="${tweet.user.avatars}">${tweet.user.name}</h5>
      <span class="faded">${tweet.user.handle}</span>
    </div>
      <p>${tweet.content.text}</p>
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

renderTweets(data);

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