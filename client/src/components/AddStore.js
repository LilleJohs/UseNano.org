import React, { Component } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
const keys = require('../infoType');
const recaptchaRef = React.createRef();

export default class AddStore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editData: [],
      captchaValue: '',
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  inputChange(key, e) {
    let newEditState = this.state.editData;
    newEditState[key] = e.target.value;
    this.setState({ editData: newEditState });
  }

  newItem(dbName, state) {
    let item;
    if (dbName in state && state[dbName] !== '') {
      item = (
        <input
          type='text'
          name={dbName}
          value={state[dbName]}
          onChange={this.inputChange.bind(this, dbName)}
        />
      );
    } else {
      item = (
        <input
          type='text'
          name={dbName}
          value={state[dbName]}
          onChange={this.inputChange.bind(this, dbName)}
        />
      );
    }
    return item;
  }

  handleSubmission() {
    // if (this.state.captchaValue === '') {
    //     return;
    // }
    let url;
    if (process.env.NODE_ENV === 'production') {
      url = 'https://usenano.org/sendform';
    } else {
      url = 'http://localhost:5000/sendform';
    }

    //const data = this.state.editData;
    //console.log({ captchaValue: this.state.captchaValue, ...data });

    const state = this.state;
    const data = new FormData();
    for (var key in state.editData) {
      data.append(key, state.editData[key]);
    }
    data.append('captcha', state.captchaValue);
    console.log(data)

    axios.post(url, data);
  }

  onChange(value) {
    this.setState({ captchaValue: value });
  }

  returnCaptcha() {
    return (
      <div>
        <div align='center'>
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey='6LfZ4MEUAAAAAA17H6aLiok2_cI0Jc2fLyQ92wrN'
            onChange={this.onChange.bind(this)}
          />
        </div>
        <div>
          <p align='center' className='nav-link'>
            <button
              disabled={this.state.captchaValue === 's'}
              type='button'
              onClick={this.handleSubmission.bind(this)}
              className='btn btn-primary btn-lg'
            >
              Submit
            </button>
          </p>
        </div>
      </div>
    );
  }

  onChangePic = (e) => {
    const errs = [];
    const file = e.target.files[0];

    const types = ['image/png', 'image/jpeg', 'image/jpg'];

    if (types.every((type) => file.type !== type)) {
      errs.push(`'${file.type}' is not a supported format`);
    }
    if (file.size > 15000) {
      errs.push(`'${file.name}' is too large, please pick a smaller file`);
    }

    this.setState((state) => {
      state.editData.logo = file;
      state.logo = URL.createObjectURL(file);
      return state;
    });
  };

  render() {
    const state = this.state.editData;
    let returnObject = [];
    for (var showName in keys.show) {
      const dbName = keys.show[showName];
      returnObject.push(
        <div key={dbName}>
          <h1>{showName}</h1>
          {this.newItem(dbName, state)}
        </div>
      );
    }

    return (
      <div>
        <div className='card text-black text-center'>
          <div className='nanorevolution'>
            <h1>Add A New Store</h1>
          </div>
          <div className='whatisnano'>
            <h1>Add all the details in the form below</h1>
          </div>
          <img alt={'logo'} src={this.state.logo} />
          <div className='button'>
            <label htmlFor='single'>
              <h4 className='btn btn-info btn-lg'>Upload Image</h4>
            </label>
            <input
              type='file'
              id='single'
              onChange={this.onChangePic}
              style={{ display: 'none' }}
            />
          </div>
          {returnObject}
        </div>
        {this.returnCaptcha()}
      </div>
    );
  }
}
