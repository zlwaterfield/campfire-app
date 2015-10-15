var $ = require('jquery');
var _ = require('underscore');

var dispatcher = require('../dispatcher/dispatcher');
var dictionary = require('../constants/dictionary');
var geohashConstants = require('../constants/geohashConstants');
var ajax = require('./ajax');

_.str = require('underscore.string');
_.mixin(_.str.exports());

var events = {
  getEvents: function(search) {
    if(search == false) {
      return;
    }
    this.buildUrl(search);
    base = 'conferences/cat1?';
    
    _.map(search, function (value, key) {
      switch (key) {

        case 'location':
          base += 'geo=' + geohash[value];
          break;

        default:
          base += dictionary[value];
      }
      base += '&';
    });

    ajax.get(base, 'SEARCH_RESULTS', 'SEARCH_ERROR');
  },
  getSingleItem: function(id) {
    ajax.get('item/' + id, 'SEARCH_SINGLE_RESULTS', 'SEARCH_SINGE_ERROR');
  },
  buildUrl: function(search) {
    var url = window.location.origin + '/#/?';
    _.map(search, function(value, key) {
      url += key + '=' + value + '&';
    });
    url = url.replace(/ /g, '-');
    url = url.substring(0, url.length-1);

    window.history.pushState(null, null, url.toLowerCase());
  }
}

module.exports = events
