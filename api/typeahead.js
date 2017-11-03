var request = require('request');

// The Type Ahead API.
module.exports = function(req, res) {
  var term = req.query.text.trim();

  // If the user hasnt typed anything after the slash command, show this prompt
  if (!term) {
    res.json([{
      title: '<i>(enter a search term)</i>',
      text: ''
    }]);
    return;
  }

  // Once the user has typed something after slash command, search hackernews for
  // stories that match this term
  request({
    url: 'http://hn.algolia.com/api/v1/search',
    qs: {
      query: term,
      tags: "story"
    },
    gzip: true,
    json: true,
    timeout: 10 * 1000
  }, function(err, response) {    
    if (err || response.statusCode !== 200 || !response.body) {
      res.status(500).send('Error');
      return;
    }

    // If there are no errors, map through results and create objects for each search result
    var results = response.body.hits.map(function(story) {
      return {
        title: story.title,
        text: JSON.stringify({ id: story.objectID, title: story.title, author: story.author, num_comments: story.num_comments })
      }
    });

    // Show if there are no results
    if (results.length === 0) {
      res.json([{
        title: '<i>(no results)</i>',
        text: ''
      }]);
    } else {
      res.json(results);
    }
  });

};
