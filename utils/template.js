// Simple templating functions. Interprets all template variables <%...%> as code and
// execute them, replacing the template variable with the result
// This code was taken from the Mixmax example:
// https://github.com/simonxca/mixmax-soundcloud-slash-command/blob/master/utils/template.js
var fs = require('fs');

var templates = {
  resolver: fs.readFileSync(__dirname + '/../templates/resolver-template.html', {
    encoding: 'UTF-8'
  })
};

exports.resolver = function (data) {
  return templates.resolver.replace(/<%[\s\S]*?%>/g, function (functionBody) {
    functionBody = functionBody.replace(/<%([\s\S]*?)%>/g, '$1');
    return Function('data', functionBody)(data);
  });
};
