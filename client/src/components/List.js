import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { doSort } from '../actions/index';

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      selected: ""
    };

    this.sort = this.sort.bind(this);
  }

  componentWillReceiveProps()
  {
    this.setState({
      page: 1,
      selected: ""
    });
  }

  newPage(i){
    this.setState({
      page: this.state.page + i,
      selected: ""
    });
  };

  renderBackButton() {
    if (this.state.page >= 2) {
      return (
        <span className="leftButton">
          <a onClick={() => {this.newPage(-1)}} className="pageButton">
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
          <a onClick={() => {this.newPage(1)}} className="pageButton">
            &#8250;
          </a>
        </span>
      );
    }
  }

  renderSelected(data) {
    // Renders more information about each store if you click on a store
    return (
      <tr key={data.name}>
        <td className="moreInfo" colSpan="4">
          <div style={{margin: '20px 0px 20px 0px'}}>
            <p>Service avaliable in or ships to: {data.country}</p>
            <p>Added: {new Intl.DateTimeFormat('en-GB', {
                year: 'numeric',
                month: 'long',
                day: '2-digit'
              }).format(new Date(data.timestamp))}</p>
          </div>
        </td>
      </tr>
    );
  }

  renderEntries() {
    var table = [];
    var start = (this.state.page-1)*50;
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
        let table = [(
          <tr style={{cursor: 'pointer'}} key={i}
            onClick={() => this.setState(this.state.selected === data.name ? {selected: ""} : {selected: data.name})}>
            <td>
              <a target="_blank" rel="noopener noreferrer" href={data.websitelink} alt={data.name}>
                <img alt={data.name} src={'logos/' + data.logo} />
              </a>
              <a target="_blank" rel="noopener noreferrer" href={data.websitelink}>{data.name}</a>
            </td>
            <td>{data.category}</td>
            <td>{data.discount}</td>
          </tr>
        )];
        if (this.state.selected === data.name)
          table.push(this.renderSelected(data))
        return table;
    }
  }

  render() {
    return (
      <div className="container">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th onClick={() => {this.sort("name")}} className="merchant">Merchant Name</th>
              <th onClick={() => {this.sort("category")}} className="category">Category</th>
              <th onClick={() => {this.sort("discount")}} className="discount">Nano Discount</th>
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

  sort(type){
    this.props.doSort(type, this.props.sort, this.props.search, this.props.correctOrder);
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
