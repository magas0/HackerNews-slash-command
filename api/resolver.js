var request = require('request');
var _ = require('underscore');
var createTemplate = require('../utils/template.js').resolver;

// The API that returns the in-email representation.
module.exports = function(req, res) {
  var term = req.query.text.trim();  

  // If the term can be parsed, we are being sent a serialized object from /typeahead
  if (JSON.parse(term)) {
    // If its a serialized object, we already have all the article info, send it to the template
    res.json({
      body: createTemplate(JSON.parse(term))
    });
  }
};
