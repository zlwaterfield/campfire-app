/** @jsx React.DOM */
var React = require('react');
var Link = require('react-router').Link;

var selectList = require('../../actions/selectList');
var store = require('../../stores/store');
var eventConstants = require('../../constants/eventConstants');

var Results = require('./results/results');
var Search = require('./search/search');

var Explore = React.createClass({
  getInitialState:function() {
    return {
      menuList: null,
      searchResults: null,
      loading: false
    }
  },
  componentDidMount: function() {
    selectList.getDropdownLists()
    store.on(eventConstants.LIST_RESULTS, this.fillSelectMenus);
  },
  componentWillUnmount: function() {
    store.off(eventConstants.LIST_RESULTS, this.fillSelectMenus);
  },
  loading: function () {
    this.setState({
      loading: true
    })
  },
  fillSelectMenus: function () {
    this.setState({
      menuList: store.getLists()
    })
  },
  handleChange: function (data) {
    this.setState({
      searchResults: data,
      loading: false
    })
  },
  render:function(){
    return (
      <div>
        { this.state.menuList ? <Search onChange={this.handleChange} list={this.state.menuList}/> : null }
        { this.state.searchResults ? <Results data={this.state.searchResults} loading={this.state.loading} /> : null }
      </div>
    )
  }
});

module.exports = Explore;
