/** @jsx React.DOM */
var React = require('react');
var Link = require('react-router').Link;
var cityConstants = require('../../../constants/cityConstants.js')
// ['#23F0C7', '#EF767A', '#7D7ABC', '#6457A6', '#FFE347']

var Results = React.createClass({
  getInitialState: function() {
    return {
      date_formatted: null,
      months: ["Jan", "Febr", "Mar", "Apr", "May", "June","July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      colors: ['#23F0C7', '#EF767A', '#7D7ABC', '#6457A6', '#FFE347']
    }
  },
  componentDidMount: function() {
    console.log(this.props)
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
    var divStyle = {
      backgroundColor: this.state.colors[Math.floor(Math.random()*this.state.colors.length)]
    };
    return (
      <div className="item">
        <div className="item-left" style={divStyle}></div>
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
