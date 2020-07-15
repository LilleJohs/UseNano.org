import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { doSort } from "../actions/index";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    background: theme.palette.secondary.main,
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
});

class StoreCards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      selected: "",
    };

    this.sort = this.sort.bind(this);
  }

  newPage(i) {
    this.setState({
      page: this.state.page + i,
      selected: "",
    });
  }

  renderBackButton() {
    if (this.state.page >= 2) {
      return (
        <span className="leftButton">
          <h4
            onClick={() => {
              this.newPage(-1);
            }}
            className="pageButton"
          >
            &#8249;
          </h4>
        </span>
      );
    }
  }

  renderPageNumber() {
    if (this.props.search != null && this.props.search.length > 50) {
      return (
        <span className="pageNumber">
          Page {this.state.page} / {Math.ceil(this.props.search.length / 50)}
        </span>
      );
    }
  }

  renderForwardButton() {
    if (
      this.props.search != null &&
      this.state.page < Math.ceil(this.props.search.length / 50)
    ) {
      return (
        <span className="rightButton">
          <h4
            onClick={() => {
              this.newPage(1);
            }}
            className="pageButton"
          >
            &#8250;
          </h4>
        </span>
      );
    }
  }

  arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }

  renderCards() {
    const { classes } = this.props;
    console.log(this.props.search);
    if (this.props.search) {
      return (
        <Grid container spacing={5}>
          {this.props.search.map((store) => (
            <Grid item key={store.name} xs={12} sm={6} md={3}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={this.renderImage(store)}
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {store.name}
                  </Typography>
                  <Typography color="">{store.category}</Typography>
                </CardContent>
                <CardActions>
                  <Button href={store.website} size="large" color="primary">
                    View
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      );
    }
  }

  renderImage(data) {
    switch (data.name) {
      case null:
        return;
      default:
        const img = data.img;
        let imageLink;
        if (img != null) {
          imageLink = `data:${
            img.contentType
          };base64,${this.arrayBufferToBase64(img.data.data)}`;
        } else {
          imageLink = "logos/none.png";
        }
        return imageLink;
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <Container>
        <Container className={classes.cardGrid} maxWidth="lg">
          {this.renderCards()}
        </Container>
        <div className="pageButtons">
          {this.renderBackButton()}
          {this.renderPageNumber()}
          {this.renderForwardButton()}
        </div>
      </Container>
    );
  }

  sort(type) {
    this.props.doSort(
      type,
      this.props.sort,
      this.props.search,
      this.props.correctOrder
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ doSort }, dispatch);
}

function mapStateToProps(state) {
  return {
    search: state.search.search,
    sort: state.search.sort,
    correctOrder: state.search.correctOrder,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(StoreCards));
