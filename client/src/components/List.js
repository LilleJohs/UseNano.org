import React, { Component } from 'react';
import { connect } from 'react-redux';

class List extends Component {
  constructor(props) {
    super(props);

    this.state = { page: 1 };

    this.goBack = this.goBack.bind(this);
    this.goForward = this.goForward.bind(this);
  }

  componentWillReceiveProps()
  {
    this.setState({ page: 1 });
  }

  goBack = () => {
    this.setState({ page: this.state.page - 1 });
  };

  goForward = () => {
    this.setState({ page: this.state.page + 1 });
  };

  renderBackButton() {
    if (this.state.page >= 2) {
      return (
        <span className="leftButton">
          <a onClick={this.goBack} className="pageButton">
            &#8249;
          </a>
        </span>
      );
    }
  }
  renderPageNumber() {
    if (this.props.search.length > 50) {
      return <span className="pageNumber">&nbsp;&nbsp;Page {this.state.page} / {Math.ceil(this.props.search.length / 50)}&nbsp;&nbsp;</span>
    }
  }
  renderForwardButton() {
    if (this.state.page < Math.ceil(this.props.search.length / 50)) {
      return (
        <span className="rightButton">
          <a onClick={this.goForward} className="pageButton">
            &#8250;
          </a>
        </span>
      );
    }
  }

  renderEntries() {
    var table = [];
    var page = this.state.page;
    var start = (page-1)*50;
    var searchLength = this.props.search.length;
    var end = (start+50 > searchLength) ? searchLength : start+50;
    for (var i = start; i < end; i++) {
      table.push(this.renderContent(this.props.search[i]));
    }
    return table;
  }

  renderContent(data) {
    switch (data.name) {
      case null:
        return;
      default:
        return (
          <tr>
            <td>
              <a href={data.websitelink} alt={data.name}>
                <img alt={data.name} src={'logos/' + data.logo} />
              </a>
              <a href={data.websitelink}>{data.name}</a>
            </td>
            <td>{data.category}</td>
            <td>Worldwide</td>
          </tr>
        );
    }
  }

  render() {
    return (
      <div className="container">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th className="merchant">Merchant Name</th>
              <th className="category">Category</th>
              <th className="category">Location</th>
            </tr>
          </thead>
          <tbody>{this.renderEntries()}</tbody>
        </table>
        <div className="pageButtons">
          {this.renderBackButton()}
          {this.renderPageNumber()}
          {this.renderForwardButton()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    search: state.search
  };
}

export default connect(mapStateToProps)(List);
