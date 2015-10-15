/** @jsx React.DOM */
var React = require('react');
var Link = require('react-router').Link;
var cityConstants = require('../../../constants/cityConstants.js')

var Results = React.createClass({
  getInitialState: function() {
    return {
      date_formatted: null,
      months: ["Jan", "Febr", "Mar", "Apr", "May", "June","July", "Aug", "Sept", "Oct", "Nov", "Dec"]
    }
  },
  componentDidMount: function() {
    this.setState({
      date_formatted: this.formatDate(this.props.item.date_start),
      cityName: cityConstants[this.props.item.geohash]
    })
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      date_formatted: this.formatDate(nextProps.item.date_start),
      cityName: cityConstants[nextProps.item.geohash]
    })
  },
  formatDate: function(date) {
    d = new Date(date);
    month = this.state.months[d.getMonth()];
    day = d.getDate();
    year = d.getFullYear();

    return month + ' ' + day + ' ' + year
  },
  render:function(){
    return (
      <div className="item">
        <div className="item-left"></div>
        <div className="item-right">
          <h3>{this.props.item.name}</h3>
          <ul>
            <li>{this.props.item.location}, {this.state.cityName}</li>
            <li>{this.props.item.price_current}</li>
            <li>{this.state.date_formatted}</li>
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = Results;
