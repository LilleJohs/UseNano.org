import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { doSort } from '../actions/index';

class List extends Component {
  constructor(props) {
    super(props);

    this.state = { page: 1 };

    this.goBack = this.goBack.bind(this);
    this.goForward = this.goForward.bind(this);
    this.sortCategory = this.sortCategory.bind(this);
    this.sortName = this.sortName.bind(this);
    this.sortLocation = this.sortLocation.bind(this);
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
      return <span className="pageNumber">Page {this.state.page} / {Math.ceil(this.props.search.length / 50)}</span>
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
    var end = (start+50 > searchLength) ? searchLength : start + 50;
    for (var i = start; i < end; i++) {
      table.push(this.renderContent(this.props.search[i], i));
    }
    return table;
  }

  renderContent(data, i) {
    switch (data.name) {
      case null:
        return;
      default:
        return (
          <tr key={i}>
            <td>
              <a target="_blank" rel="noopener noreferrer" href={data.websitelink} alt={data.name}>
                <img alt={data.name} src={'logos/' + data.logo} />
              </a>
              <a target="_blank" rel="noopener noreferrer" href={data.websitelink}>{data.name}</a>
            </td>
            <td>{data.category}</td>
            <td>{data.country}</td>
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
              <th onClick={this.sortName} className="merchant">Merchant Name</th>
              <th onClick={this.sortCategory} className="category">Category</th>
              <th onClick={this.sortLocation} className="category">Location</th>
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

  sortName(){
    this.props.doSort("name", this.props.sort, this.props.search, this.props.correctOrder);
  }
  sortCategory(){
    this.props.doSort("category", this.props.sort, this.props.search, this.props.correctOrder);
  }
  sortLocation(){
    this.props.doSort("location", this.props.sort, this.props.search, this.props.correctOrder);
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ doSort }, dispatch);
}

function mapStateToProps(state) {
  return {
    search: state.search.search,
    sort: state.search.sort,
    correctOrder: state.search.correctOrder
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
