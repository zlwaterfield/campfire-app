/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var routes = require('./routes');

Router.run(routes, function(Handler, state) {
  var params = state.params;
  React.render(<Handler params={params}/>, document.getElementById('main'))
})