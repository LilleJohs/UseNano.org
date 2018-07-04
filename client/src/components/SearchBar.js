import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { doSearch, doSort } from '../actions/index';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };

    this.onInputChange = this.onInputChange.bind(this);
    this.props.doSearch();
  }

  render() {
    return (
      <div className="form-group">
        <h1 className="text-center merchantdirectory">
          Merchant Directory
        </h1>
        <form className="col-sm-8 col-sm-offset-2">
          <input
            placeholder = "Search for anything!"
            className = "form-control"
            value={this.state.term}
            onChange={this.onInputChange}
          />
        </form>
      </div>
    );
  }

  onInputChange(event){
    this.setState({ term: event.target.value });
    this.props.doSearch(event.target.value);
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ doSearch, doSort }, dispatch);
}


export default connect(null, mapDispatchToProps)(SearchBar);
