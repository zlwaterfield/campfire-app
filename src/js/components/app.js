/** @jsx React.DOM */
var React = require('react');
var RouteHandler = require('react-router').RouteHandler;

var App = React.createClass({
  render:function(){
    return (
      <div>
        <RouteHandler params={this.props.params}/>
        <div className="footer"></div>
      </div>
    )
  }
});

module.exports = App;
