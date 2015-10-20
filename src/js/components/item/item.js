/** @jsx React.DOM */
var React = require('react');
var Link = require('react-router').Link;

var events = require('../../actions/events');
var store = require('../../stores/store');
var eventConstants = require('../../constants/eventConstants');

var Item = React.createClass({
  getInitialState: function () {
    return {
      item: null,
      colors: ['#23F0C7', '#EF767A', '#7D7ABC', '#6457A6', '#FFE347']
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
    var divStyle = {
      backgroundColor: this.state.colors[Math.floor(Math.random()*this.state.colors.length)]
    };
    if(this.state.item) {
      return (
        <div className="item-container">
          <div className="item-header" style={divStyle}>
            <h1 className="title">{this.state.item.name}</h1>
          </div>
          <div className="item-content">
            <div className="row">
              <div className="col-md-6">
                {this.state.item.description}
              </div>
              <div className="col-md-6">
                <span>Price Current: {this.state.item.price_current}</span><br/>
                <span>Location: {this.state.item.location}</span><br/>
                <span>Url: {this.state.item.url}</span><br/>
                <span>Venue: {this.state.item.venue}</span>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <span>loading</span>
      )
    }
  }
});

module.exports = Item;
