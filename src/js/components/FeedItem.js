const React = require('react');
const _ = require('underscore');
const Fingerprint2 = require('fingerprintjs2');

let accessKey;
new Fingerprint2().get(function(result, components){
  accessKey = result; //a hash, representing your device fingerprint
});

const FeedItem = React.createClass({
  vote: function(votes) {
    this.props.onVote({
      id: this.props.id,
      title: this.props.title,
      url: this.props.url,
      votes: votes
    });
  },

  voteUp: function() {
    let votes = Array.prototype.concat.apply([], this.props.votes);
    if (_.indexOf(votes, accessKey) < 0) {
      votes.push(accessKey);
    }

    this.vote(votes);
  },

  voteDown: function() {
    let votes = Array.prototype.concat.apply([], this.props.votes);
    if (_.indexOf(votes, accessKey) >= 0) {
      votes = _.without(votes, accessKey)
    }

    this.vote(votes);
  },

  render: function() {
    const votes = this.props.votes ? this.props.votes.length : 0;
    const positiveNegativeClassName = 'badge badge-' + (votes >= 0 ? 'success' : 'danger');

    return (
      <li key={this.props.id} style={styles.item}>
        <h4 style={styles.title}>{this.props.title}</h4>
        <div>
          <a href={this.props.url} target="_blank" style={styles.url}>
            {this.props.url}
          </a>
        </div>
        <div style={styles.votes}>
          <div>
            <button id="up" className="btn btn-sm btn-primary" onClick={this.voteUp}>
              <span className="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span>
            </button>
            <button id="down" className="btn btn-sm btn-primary" onClick={this.voteDown}>
              <span className="glyphicon glyphicon-thumbs-down" aria-hidden="true"></span>
            </button>
          </div>
          <div className={positiveNegativeClassName}>{votes}</div>
        </div>
      </li>
    );
  }
});

const styles = {
  item: {
    flex: 1,
    height: 150,
    paddingTop: '20px',
    paddingBottom: '20px',
    paddingLeft: '15px',
    paddingRight: '15px',
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#ddd',
  },
  title: {
    marginBottom: '5px',
  },
  url: {
    display: 'block',
    marginBottom: '10px',
  },
  votes: {
    alignSelf: 'flex-end',
    display: 'flex',
    flexDirection: 'column'
  },
}

module.exports = FeedItem;
