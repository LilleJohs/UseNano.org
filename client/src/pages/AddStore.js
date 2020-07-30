import React, { Component } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

import Header from "../components/Header";
import Footer from "../components/Footer";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

import OneCard from "../components/OneCard";

const useStyles = (theme) => ({
  container: {
    textAlign: "center",
  },
  typeStoreButton: {
    margin: theme.spacing(2),
  },
  head: {
    margin: theme.spacing(7, 0, 5),
  },
  head2: {
    margin: theme.spacing(4, 0, 6),
  },
  fieldBox: {
    margin: theme.spacing(4, 0, 4),
  },
  fieldHead: {
    margin: theme.spacing(2, 0, 2),
  },
  fieldInfo: {
    margin: theme.spacing(2, 0, 2),
  },
});

const keys = require("../infoType");
const recaptchaRef = React.createRef();

class AddStore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editDataOnline: [],
      editDataPhysical: [],
      captchaValue: "",
      typeOfStore: "empty",
      picErrors: [],
      submitted: false,
    };

    this.inputChange = this.inputChange.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  inputChange(e) {
    const state = this.state;
    const target = e.target;
    const key = target.name;
    const value = target.value;
    if (state.typeOfStore === "Online") {
      const newEditState = state.editDataOnline;
      newEditState[key] = value;
      console.log(newEditState);
      this.setState({ editDataOnline: newEditState });
    } else if (state.typeOfStore === "Physical") {
      const newEditState = state.editDataPhysical;
      newEditState[key] = value;
      this.setState({ editDataPhysical: newEditState });
    }
  }

  handleSubmission() {
    // if (this.state.captchaValue === '') {
    //     return;
    // }
    let url;
    if (process.env.NODE_ENV === "production") {
      url = `https://usenano.org/sendform${this.state.typeOfStore.toLowerCase()}`;
    } else {
      url = `http://localhost:5000/sendform${this.state.typeOfStore.toLowerCase()}`;
    }

    //const data = this.state.editData;
    //console.log({ captchaValue: this.state.captchaValue, ...data });

    const state = this.state;
    const data = new FormData();
    const editData =
      state.typeOfStore === "Online"
        ? state.editDataOnline
        : state.editDataPhysical;
    for (var key in editData) {
      data.append(key, editData[key]);
    }
    data.append("captcha", state.captchaValue);

    axios.post(url, data);

    this.setState({ submitted: true });
  }

  onChange(value) {
    this.setState({ captchaValue: value });
  }

  returnCaptcha() {
    return (
      <div>
        <Container>
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey="6LfZ4MEUAAAAAA17H6aLiok2_cI0Jc2fLyQ92wrN"
            onChange={this.onChange.bind(this)}
          />
        </Container>
        <Button
          disabled={this.state.captchaValue === "s"}
          size="large"
          color="primary"
          variant="contained"
          onClick={this.handleSubmission.bind(this)}
        >
          Submit
        </Button>
      </div>
    );
  }

  onChangePic = (e) => {
    const errs = [];
    const file = e.target.files[0];

    const types = ["image/png", "image/jpeg", "image/jpg"];

    if (types.every((type) => file.type !== type)) {
      errs.push(`'${file.type}' is not a supported format`);
    }
    if (file.size > 1000) {
      errs.push(`'${file.name}' is too large, please pick a smaller file`);
    }

    this.setState((state) => {
      state.picErrors = errs;
      state.editDataOnline.logo = file;
      state.logo = URL.createObjectURL(file);
      return state;
    });
  };

  newItem(key, storeKeys, state) {
    const entry = storeKeys[key];
    const dbName = entry.dbEntry;
    let item = (
      <TextField
        type="text"
        onChange={this.inputChange}
        name={dbName}
        value={state[dbName] || ""}
        id="outlined-basic"
        variant="outlined"
        placeholder={entry.placeholder}
      />
    );

    const { classes } = this.props;

    if (entry.required) {
      item = (
        <span>
          <Typography color="error">Required</Typography>
          {item}
        </span>
      );
    }

    return (
      <Grid item key={entry.name} xs={6} sm={6} md={6}>
        <Container className={classes.fieldBox} key={entry.dbEntry}>
          <Typography className={classes.fieldHead} variant="h2">
            {key}
          </Typography>
          <Typography className={classes.fieldInfo} variant="h4">
            {entry.info}
          </Typography>
          {item}
        </Container>
      </Grid>
    );
  }

  allItems() {
    let editState;
    let storeKeys;

    if (this.state.typeOfStore === "Online") {
      editState = this.state.editDataOnline;
      storeKeys = keys.showOnline;
    } else if (this.state.typeOfStore === "Physical") {
      editState = this.state.editDataPhysical;
      storeKeys = keys.showPhysical;
    }

    let returnObject = [];
    for (var key in storeKeys)
      if (storeKeys[key].edit) {
        returnObject.push(this.newItem(key, storeKeys, editState));
      }
    return returnObject;
  }

  storeForm() {
    const { classes } = this.props;
    const state = this.state;
    let picErrors = [];
    for (var showName in state.picErrors) {
      picErrors.push(<Container>{showName}</Container>);
    }

    let completeStore = state.editDataOnline;
    completeStore.img = state.logo;

    return (
      <div>
        <Container>
          <Typography className={classes.head2} variant="h1">
            {state.typeOfStore} Store
          </Typography>
          <Typography className={classes.head2} variant="h2">
            Add all the details in the form below
          </Typography>
        </Container>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
          spacing={4}
        >
          {this.allItems()}
        </Grid>
        <Typography className={classes.head} variant="h2">
          Do you want to upload a picture?
        </Typography>
        <Container>{picErrors.length >= 1 && picErrors[0]}</Container>
        <Container>
          <label htmlFor="single">
            <Button
              onClick={(e) => {
                this.refs["file-upload"].click();
              }}
              size="large"
              color="primary"
              variant="contained"
            >
              {state.logo != null ? "Change Image" : "Upload Image"}
            </Button>
          </label>
          <input
            ref={"file-upload"}
            type="file"
            id="single"
            onChange={this.onChangePic}
            style={{ display: "none" }}
          />
        </Container>
        <Container maxWidth="xs">
          <Typography className={classes.head} variant="h2">
            This is how it would look on the main page
          </Typography>
          <OneCard store={completeStore} />
        </Container>
        {this.returnCaptcha()}
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    const submitted = this.state.submitted;

    let content;
    if (submitted) {
      content = (
        <div>
          <Typography className={classes.head} variant="h1">
            Store Has Been Sent For Review
          </Typography>
        </div>
      );
    } else {
      content = (
        <div>
          <Typography className={classes.head} variant="h1">
            Add A New Store
          </Typography>
          <Typography className={classes.head2} variant="h2">
            What kind of store do you wanna add?
          </Typography>
          <span>
            <Button
              size="large"
              className={classes.typeStoreButton}
              color="primary"
              variant="contained"
              disabled={this.state.typeOfStore === "Online"}
              onClick={() => this.setState({ typeOfStore: "Online" })}
            >
              Online
            </Button>
            <Button
              className={classes.typeStoreButton}
              size="large"
              color="primary"
              variant="contained"
              disabled={this.state.typeOfStore === "Physical"}
              onClick={() => this.setState({ typeOfStore: "Physical" })}
            >
              Physical
            </Button>
          </span>
          {this.state.typeOfStore !== "empty" && this.storeForm()}
        </div>
      );
    }

    return (
      <div>
        <Header path="/addstore" />
        <Container className={classes.container}>{content}</Container>
        <Footer />
      </div>
    );
  }
}

export default withStyles(useStyles)(AddStore);
