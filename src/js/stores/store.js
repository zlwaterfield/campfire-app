var EventEmitter = require('eventemitter3');
var eventEmitter = new EventEmitter();
var assign = require('object-assign');

var dispatcher = require('../dispatcher/dispatcher');
var eventConstants = require('../constants/eventConstants');

var searchResults = {};
var searchSingleResults = {};
var listResults = {}
var lastRequest = null
var paginationToken = null

var AppStore = {
  getResults: function() {
    return searchResults;
  },
  getItem: function() {
    return searchSingleResults[0];
  },
  getLastRequest: function() {
    return  lastRequest;
  },
  getPaginationToken: function() {
    return paginationToken;
  },
  getLists: function() {
    return  listResults;
  },
  emitChange: function(event) {
    eventEmitter.emit(event);
  },
  on: function(event, callback) {
    eventEmitter.on(event, callback); 
  },
  off: function(event, callback) {
    eventEmitter.removeListener(event, callback);
  }
}

dispatcher.register(function(payload){

  switch (payload.actionType) {

    case eventConstants.SEARCH_RESULTS:
      if(payload.page) {
        searchResults = searchResults.concat(payload.results.r);
      } else {
        searchResults = payload.results.r;
      }
      lastRequest = payload.url,
      paginationToken = payload.results.p
      AppStore.emitChange(eventConstants.SEARCH_RESULTS);
      break;

    case eventConstants.LIST_RESULTS:
      listResults = payload.results;
      AppStore.emitChange(eventConstants.LIST_RESULTS);
      break;

    case eventConstants.SEARCH_SINGLE_RESULTS:
      searchSingleResults = payload.results;
      AppStore.emitChange(eventConstants.SEARCH_SINGLE_RESULTS);
      break;

    default:

  }
});

module.exports = AppStore;
