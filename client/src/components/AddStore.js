import React, { Component } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
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
        window.scrollTo(0, 0)
    }

    inputChange(key, e) {
        let newEditState = this.state.editData;
        newEditState[key] = e.target.value;
        this.setState({ editData: newEditState });
    }

    newItem(dbName, state) {
        let item;
        if (dbName in state && state[dbName] !== '') {
            item = <input type="text" name={dbName} value={state[dbName]} onChange={this.inputChange.bind(this, dbName)} />;
        } else {
            item = <input type="text" name={dbName} value={state[dbName]} onChange={this.inputChange.bind(this, dbName)} />;
        }
        return item;
    }

    handleSubmission() {
        // if (this.state.captchaValue === '') {
        //     return;
        // }
        let url;
        if (process.env.NODE_ENV === 'production') {
            url = 'https://usenano.org/sendForm';
        } else {
            url = 'http://localhost:5000/sendForm';
        }

        const data = this.state.editData;
        console.log({ captchaValue: this.state.captchaValue, ...data });
        axios.post(url, {
            captchaValue: this.state.captchaValue,
            ...data,
        });
    }

    onChange(value) {
        this.setState({ captchaValue: value });
    }

    returnCaptcha() {
        return (
            <div>
                <div align="center">
                    <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey="6LfZ4MEUAAAAAA17H6aLiok2_cI0Jc2fLyQ92wrN"
                        onChange={this.onChange.bind(this)}
                    />
                </div>
                <div>
                    <p align="center" className="nav-link">
                        <button disabled={this.state.captchaValue === ''} type="button" onClick={this.handleSubmission.bind(this)} className="btn btn-primary btn-lg">Submit</button>
                    </p>
                </div>
            </div>
        );
    }

    render() {
        const state = this.state.editData;
        let returnObject = [];
        for (var showName in keys.show) {
            const dbName = keys.show[showName];
            returnObject.push(
                <div key={dbName}>
                    <h1>{showName}</h1>
                    {this.newItem(dbName, state)}
                </div>);
        }

        return (
            <div>
                <div className="card text-black text-center">
                    <div className="nanorevolution">
                        <h1>Add A New Store</h1>
                    </div>
                    <div className="whatisnano">
                        <h1>Add all the details in the form below</h1>
                    </div>
                    {returnObject}
                </div>
                {
                    this.returnCaptcha()
                }
            </div >
        );
    }
}