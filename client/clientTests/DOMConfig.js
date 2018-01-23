//const jsdom = require('jsdom').jsdom;

module.exports = function (markup) {
    if (typeof document !== 'undefined') return;
    global.document = jsdom(markup || '');
    global.alert = function(){};
    global.window = document.defaultView;
}
