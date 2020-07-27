function parseStyles(response, subUrl) {

  var regex = new RegExp(`href="${subUrl}/([^/]*)/`, 'g');

  var matches = [];
  var match;
  while ((match = regex.exec(response)) !== null) {
    match = match[1];
    if (!/(consumer[-_]reviews)|(styles)/.test(match)) matches.push(match);
  }

  return matches;
}

export default parseStyles;
