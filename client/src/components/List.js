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

  // componentWillReceiveProps() {
  //   this.setState({
  //     page: 1,
  //     selected: ""
  //   });
  // }

  newPage(i) {
    this.setState({
      page: this.state.page + i,
      selected: ""
    });
  };

  renderBackButton() {
    if (this.state.page >= 2) {
      return (
        <span className="leftButton">
          <h4 onClick={() => { this.newPage(-1) }} className="pageButton">
            &#8249;
          </h4>
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
          <h4 onClick={() => { this.newPage(1) }} className="pageButton">
            &#8250;
          </h4>
        </span>
      );
    }
  }

  renderSelected(data) {
    // Renders more information about each store if you click on a store
    return (
      <tr key={data.name}>
        <td className="moreInfo" colSpan="4">
          <div style={{ margin: '20px 0px 20px 0px' }}>
            <p>Service avaliable in or ships to: {data.country}</p>
            <p>Added: {new Intl.DateTimeFormat('en-GB', {
              year: 'numeric',
              month: 'long',
              day: '2-digit'
            }).format(new Date(data.dateLastUpdated))}</p>
            <p onClick={() => this.props.history.push('/online', { data: data })} className="nav-link">
              <button type="button" className="btn btn-primary btn-lg">Learn More!</button>
            </p>
          </div>
        </td>
      </tr>
    );
  }

  renderEntries() {
    var table = [];
    var start = (this.state.page - 1) * 50;
    var searchLength = this.props.search.length;
    var end = (start + 50 > searchLength) ? searchLength : start + 50;
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
          <tr style={{ cursor: 'pointer' }} key={i}
            onClick={() => this.setState(this.state.selected === data.name ? { selected: "" } : { selected: data.name })}>
            <td>
              <a className="logo-link" target="_blank" rel="noopener noreferrer" href={data.website} alt={data.name}>
                <img alt={data.name} className="logo" src={'logos/' + data.logo} />
              </a>
              <span className="company-name"> <a className="name" target="_blank" rel="noopener noreferrer" href={data.website}>{data.name}</a></span>
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
              <th onClick={() => { this.sort("name") }} className="merchant">Merchant Name</th>
              <th onClick={() => { this.sort("category") }} className="category">Category</th>
              <th onClick={() => { this.sort("discount") }} className="discount">Nano Discount</th>
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

  sort(type) {
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
