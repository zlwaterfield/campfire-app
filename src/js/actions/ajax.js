var $ = require('jquery');

var dispatcher = require('../dispatcher/dispatcher');
var eventConstants = require('../constants/eventConstants');

var ajax = {
  get: function(query, suc, err) {
    // base = "http://localhost:3000/api/";
    base = "http://wilted.me/api/";
    url = base + query;
    
    $.get(url)
      .done(function(data) {
        console.log( "success" );
        dispatcher.dispatch({
          actionType: eventConstants[suc],
          results: data
        });
      })
      .fail(function(error) {
        console.log( "error" );
        dispatcher.dispatch({
          actionType: eventConstants[err],
          error: error
        });
      })
  }
}

module.exports = ajax
