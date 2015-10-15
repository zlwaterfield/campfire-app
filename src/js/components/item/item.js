/** @jsx React.DOM */
var React = require('react');
var Link = require('react-router').Link;

var events = require('../../actions/events');
var store = require('../../stores/store');
var eventConstants = require('../../constants/eventConstants');

var Item = React.createClass({
  getInitialState: function () {
    return {
      item: null
    }
  },
  componentDidMount: function() {
    events.getSingleItem(this.props.params['id']);
    store.on(eventConstants.SEARCH_SINGLE_RESULTS, this.getData);
  },
  componentWillUnmount: function () {
    store.off(eventConstants.SEARCH_SINGLE_RESULTS, this.getData);
  },
  getData: function () {
    this.setState({
      item : store.getItem()
    })
  },
  render:function(){
    return (
      <div>
        <h1>Item: {this.state.item ? <h2>{this.state.item.name}</h2> : null }</h1>
      </div>
    )
  }
});

module.exports = Item;
