/** @jsx React.DOM */
var React = require('react');
var $ = require('jquery');
var _ = require('underscore');
var Link = require('react-router').Link;

var selectList = require('../../actions/selectList');
var events = require('../../actions/events');
var store = require('../../stores/store');
var eventConstants = require('../../constants/eventConstants');

var Results = require('./results/results');
var Search = require('./search/search');

var Explore = React.createClass({
  getInitialState:function() {
    return {
      menuList: null,
      searchResults: null,
      loading: false,
      calledPagination: false
    }
  },
  componentDidMount: function() {
    selectList.getDropdownLists()
    store.on(eventConstants.LIST_RESULTS, this.fillSelectMenus);
    store.on(eventConstants.SEARCH_RESULTS, this.calledPagination);
    document.addEventListener('scroll', this.handleScroll);
  },
  componentWillUnmount: function() {
    store.off(eventConstants.LIST_RESULTS, this.fillSelectMenus);
    store.off(eventConstants.SEARCH_RESULTS, this.calledPagination);
    document.removeEventListener('scroll', this.handleScroll);
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
  handleScroll: function () {
    scrollPosition = window.pageYOffset;
    windowSize     = window.innerHeight;
    bodyHeight     = document.body.offsetHeight;

    distanceFromBottom = Math.max(bodyHeight - (scrollPosition + windowSize), 0);

    if(distanceFromBottom < 100) {
      if(!this.state.calledPagination) {
        this.getMoreData()
        this.setState({
          calledPagination:true
        })
      }
    }
  },
  calledPagination: function () {
    var that = this;
    _.delay(function () {
        that.setState({
          calledPagination:false
        })
      }, 200)

  },
  getMoreData: function() {
    events.getMoreData(store.getLastRequest(), store.getPaginationToken())
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
