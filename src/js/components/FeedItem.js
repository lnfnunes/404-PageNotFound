var React = require('react');
var _ = require('underscore');
var Fingerprint2 = require('fingerprintjs2');

var accessKey;
new Fingerprint2().get(function(result, components){
  accessKey = result; //a hash, representing your device fingerprint
});

var FeedItem = React.createClass({

  vote: function(votes) {
    this.props.onVote({
      id: this.props.id,
      title: this.props.title,
      url: this.props.url,
      votes: votes
    });
  },

  voteUp: function() {
    var votes = [];
    votes = this.props.votes;

    if (_.indexOf(votes, accessKey) < 0) {
      votes.push(accessKey);
    }

    this.vote(votes);
  },

  voteDown: function() {
    var votes = [];
    votes = this.props.votes;

    if (_.indexOf(votes, accessKey) >= 0) {
      votes = _.without(votes, accessKey)
    }

    this.vote(votes);
  },

  render: function() {

    var positiveNegativeClassName = this.props.voteCount >= 0 ?
                                    'badge badge-success' :
                                    'badge badge-danger';

    return (
      <li key={this.props.id} className="list-group-item">
        <span className={positiveNegativeClassName}>{this.props.votes.length}</span>
        <h4>{this.props.title}</h4>
        <span><a href={this.props.url} target="_blank"><span className="glyphicon glyphicon-link" aria-hidden="true"></span> Access</a></span>
        <span className="pull-right">
          <button id="up" className="btn btn-sm btn-primary" onClick={this.voteUp}>
            <span className="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span>
          </button>
          <button id="down" className="btn btn-sm btn-primary" onClick={this.voteDown}>
            <span className="glyphicon glyphicon-thumbs-down" aria-hidden="true"></span>
          </button>
        </span>
      </li>
    );
  }

});

module.exports = FeedItem;
