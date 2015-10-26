/** @jsx React.DOM */
var React = require('react');
var Link = require('react-router').Link;

var Item = require('./item')
var Loading = require('./loading')

var Results = React.createClass({
  render:function(){
    return (
      <div className="results">
        <div className="row">
          <div className="col-lg-offset-1 col-lg-10 col-md-12">
            {this.props.loading ? <Loading /> : null }
            {this.props.data.map(function(item, i) {
              return (
                  <div className="col-md-6 col-xs-12">
                    <Link to='item' params={{ id:item.event_id }}>
                      <Item item={item}/>
                    </Link>
                  </div>
                )
            })}
            </div>
        </div>
      </div>
    );
  }
});

module.exports = Results;
