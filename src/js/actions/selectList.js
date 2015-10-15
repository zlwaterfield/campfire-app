var $ = require('jquery');

var ajax = require('./ajax');


var selectList = {
  getDropdownLists: function() {
    ajax.get('tag_btns', 'LIST_RESULTS', 'LIST_ERROR');
  }
}

module.exports = selectList
