/** @jsx React.DOM */
var React = require('react');
var _ = require('underscore');

var events = require('../../../actions/events');
var store = require('../../../stores/store');
var eventConstants = require('../../../constants/eventConstants');

var SelectMenu = require('./select-menu');
var TypeInput = require('./type-input');

_.str = require('underscore.string');
_.mixin(_.str.exports());

var Search = React.createClass({
  getInitialState:function() {
    return {
      query: {}
    }
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      list: nextProps.list
    });
  },
  componentDidMount: function() {
    var onLoadObj = this.parseOnLoadUrl(window.location.hash)
    events.getEvents(onLoadObj);
    this.setState({
      query: onLoadObj || {},
      list: this.props.list,
      priceDefault: onLoadObj['price'] || 'default',
      locationDefault: onLoadObj['location'] || 'default',
      dateDefault: onLoadObj['date'] || 'default'
    });
    store.on(eventConstants.SEARCH_RESULTS, this.getData);
  },
  componentWillUnmount: function () {
    store.off(eventConstants.SEARCH_RESULTS, this.getData);
  },
  getData: function() {
    this.props.onChange(store.getResults())
  },
  parseOnLoadUrl: function (query) {
    query = query.substring(3).replace(/-/g, ' ');
    if(!query.length) {
      return false;
    }
    return _
      .chain(query.split('&'))
      .map(function(params) {
        var p = params.split('=');
        return [p[0], decodeURIComponent(p[1])];
      })
      .object()
      .value();
  },
  handleChange:function(event){
    query = this.state.query;
    query[event.target.name.toLowerCase()] = event.target.value.toLowerCase();
    events.getEvents(query);
    this.setState({
      query : query
    })
  },
  toTitleCase: function(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  },
  render:function(){
    return (
      <div className="search-header">
        <div className="search">
          <span className="search-title">UX Conferences</span>
          { this.state.list ? <SelectMenu type="Price" onChange={this.handleChange} defaultValue={this.toTitleCase(this.state.priceDefault)} list={this.state.list[1]} imageUrl={'images/icons/cost.png'}/> : null }
          { this.state.list ? <SelectMenu type="Location" onChange={this.handleChange} defaultValue={this.toTitleCase(this.state.locationDefault)} list={this.state.list[0]} imageUrl={'images/icons/location.png'}/> : null }
          { this.state.list ? <SelectMenu type="Date" onChange={this.handleChange} defaultValue={this.toTitleCase(this.state.dateDefault)} list={this.state.list[2]} imageUrl={'images/icons/date.png'}/> : null }
        </div>
      </div>
    );
  }
});

module.exports = Search;
