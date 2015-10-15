/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

var routes = (
  <Route name="app" path="/" handler={require('./components/app')}>
    <DefaultRoute handler={require('./components/explore/explore')} />
    <Route name="item" path="item/:id" handler={require('./components/item/item')} />
  </Route>
  );

module.exports = routes;

