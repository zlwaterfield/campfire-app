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
    base = 'conferences/1?';
    
    _.map(search, function (value, key) {
      switch (key) {

        case 'location':
          if(!(value === 'all locations')) {
            base += 'near=' + geohashConstants[value];
          }
          break;

        case 'price':
          if(!(value === 'all prices')) {
            if(typeof value === 'number') {
              base += 'price=' + value;
            } else {
              base += dictionary[value];
            }
          }
          break;

        case 'date':
          if(!(value === 'all dates')) {
            base += dictionary[value];
          }
          break;
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
