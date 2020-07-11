import React, { Component } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';

import Header from "../components/Header";
import Footer from "../components/Footer";

const keys = require('../infoType');
const recaptchaRef = React.createRef();

export default class AddStore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editDataOnline: [],
      editDataPhysical: [],
      captchaValue: '',
      typeOfStore: 'empty',
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  inputChange(key, e) {
    let newEditState;
    if (this.state.typeOfStore === 'Online') {
      newEditState = this.state.editDataOnline;
      newEditState[key] = e.target.value;
      this.setState({ editDataOnline: newEditState });
    } else if (this.state.typeOfStore === 'Physical') {
      newEditState = this.state.editDataPhysical;
      newEditState[key] = e.target.value;
      this.setState({ editDataPhysical: newEditState });
    }
  }

  newItem(dbName, state) {
    const item = (
      <input
        type='text'
        name={dbName}
        value={state[dbName]}
        onChange={this.inputChange.bind(this, dbName)}
      />
    );

    return item;
  }

  handleSubmission() {
    // if (this.state.captchaValue === '') {
    //     return;
    // }
    let url;
    if (process.env.NODE_ENV === 'production') {
      url = `https://usenano.org/sendform${this.state.typeOfStore.toLowerCase()}`;
    } else {
      url = `http://localhost:5000/sendform${this.state.typeOfStore.toLowerCase()}`;
    }

    //const data = this.state.editData;
    //console.log({ captchaValue: this.state.captchaValue, ...data });

    const state = this.state;
    const data = new FormData();
    const editData = state.editData === 'Online' ? state.editDataOnline : state.editDataPhysical;
    for (var key in editData) {
      data.append(key, editData[key]);
    }
    data.append('captcha', state.captchaValue);

    axios.post(url, data);
  }

  onChange(value) {
    this.setState({ captchaValue: value });
  }

  returnCaptcha() {
    return (
      <div>
        <div className='captcha' align='center'>
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
      state.editDataOnline.logo = file;
      state.logo = URL.createObjectURL(file);
      return state;
    });
  };

  storeForm(returnObject) {
    return (
      <div>
        <div className='whatisnano'>
          <h1>{this.state.typeOfStore} Store</h1>
          <h2>Add all the details in the form below</h2>
        </div>
        {this.state.logo != null && <img alt={'logo'} src={this.state.logo} />}
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
        {this.returnCaptcha()}
      </div>
    );
  }

  render() {
    let state;
    let storeKeys;
    if (this.state.typeOfStore === 'Online') {
      state = this.state.editDataOnline;
      storeKeys = keys.showOnline;
    } else if (this.state.typeOfStore === 'Physical') {
      state = this.state.editDataPhysical;
      storeKeys = keys.showPhysical;
    }
    let returnObject = [];
    for (var showName in storeKeys) {
      if (storeKeys[showName].edit === true) {
        const entry = storeKeys[showName];
        returnObject.push(
          <div key={entry.dbEntry}>
            <h1>{showName}</h1>
            <h4>{entry.info}</h4>
            {this.newItem(entry.dbEntry, state)}
          </div>
        );
      }
    }

    return (
      <div>
        <Header path='/addstore'/>
        <div className='card text-black text-center'>
          <div className='nanorevolution'>
            <h1>Add A New Store</h1>
          </div>
          <h1>What kind of store do you wanna add?</h1>
          <span>
            <button
              disabled={this.state.typeOfStore === 'Online'}
              type='button'
              onClick={() => this.setState({ typeOfStore: 'Online' })}
              className='btn btn-primary btn-lg'
            >
              Online
            </button>
            <button
              disabled={this.state.typeOfStore === 'Physical'}
              type='button'
              onClick={() => this.setState({ typeOfStore: 'Physical' })}
              className='btn btn-primary btn-lg'
            >
              Physical
            </button>
          </span>
          {this.state.typeOfStore !== 'empty' && this.storeForm(returnObject)}
        </div>
        <Footer/>
      </div>
    );
  }
}
