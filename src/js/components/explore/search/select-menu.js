/** @jsx React.DOM */
var React = require('react');

var Search = React.createClass({
  handChange:function(event) {
    this.props.onChange(event);
  },
  render:function(){
    return (
      <div className="select-style">
        <select name={this.props.type} onChange={this.handChange} defaultValue={this.props.defaultValue}>
          <option value="Default" disabled>{this.props.type}</option>
          {this.props.list.list.map(function(item) {
            return <option value={item}>{item}</option>
          })}
        </select>
      </div>
    );
  }
});

module.exports = Search;
