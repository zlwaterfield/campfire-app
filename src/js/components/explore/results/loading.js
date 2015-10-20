/** @jsx React.DOM */
var React = require('react');

var Results = React.createClass({
  render:function(){
    return (
      <div className="item">
        <div className="item-left"></div>
        <div className="item-right">
          <h3>{this.props.item.name}</h3>
          <ul>
            <li>hi</li>
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = Results;
