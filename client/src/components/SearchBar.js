import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { doSearch, doSort } from "../actions/index";

import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({
  content: {
    background: `linear-gradient(0deg, ${theme.palette.secondary.main} 50%, ${theme.palette.primary.main} 50%);`,
  },
  input: {
    background: "white",
  },
});

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: "" };

    this.onInputChange = this.onInputChange.bind(this);
    this.props.doSearch("");
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.content}>
        <Container maxWidth="sm">
          <form>
            <TextField
              fullWidth
              name="searchbar"
              value={this.state.term}
              onChange={this.onInputChange}
              id="outlined-basic"
              placeholder="Search for anything (Apparel, Gaming, Sunglasses, ...)"
              variant="outlined"
              InputProps={{
                className: classes.input,
              }}
            />
          </form>
        </Container>
      </div>
    );
  }

  onInputChange(event) {
    this.setState({ term: event.target.value });
    this.props.doSearch(event.target.value);
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ doSearch, doSort }, dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(withStyles(useStyles)(SearchBar));
