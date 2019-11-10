import React, { Component } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';
const keys = require('../infoType');
const recaptchaRef = React.createRef();

class OnlineStore extends Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: false,
            captchaValue: '',
        };

        if (this.props.location.state == null) {
            this.props.history.push('/');
        } else {
            this.state.data = this.props.location.state.data;
        }
        this.state.editData = this.props.location.state.data;
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    inputChange(key, e) {
        let newEditState = this.state.editData;
        newEditState[key] = e.target.value;
        this.setState({ editData: newEditState });
    }

    newItem(dbName, state, edit) {
        let item;
        if (dbName in state && state[dbName] !== '') {
            item = edit ? <input type="text" name={dbName} value={state[dbName]} onChange={this.inputChange.bind(this, dbName)} /> : <p>{state[dbName]}</p>;
        } else {
            item = edit ? <input type="text" name={dbName} value={state[dbName]} onChange={this.inputChange.bind(this, dbName)} /> : <p>No Info</p>;
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
        if (this.state.edit) {
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
    }

    render() {
        const edit = this.state.edit;
        const state = edit ? this.state.editData : this.state.data;
        let returnObject = [];
        for (var showName in keys.show) {
            const dbName = keys.show[showName];
            returnObject.push(
                <div key={dbName}>
                    <h1>{showName}</h1>
                    {this.newItem(dbName, state, edit)}
                </div>);
        }

        return (
            <div>
                <div className="card text-black text-center">
                    <div className="nanorevolution">
                        <h1>{state.name}</h1>
                    </div>
                    <div className="image">
                        <img alt={state.name} className="logo" src={'logos/playa.png'} />
                    </div>
                    {returnObject}
                </div>
                {
                    this.returnCaptcha()
                }
                <div>
                    <p align="center" className="nav-link">
                        <button type="button" onClick={() => this.setState({ edit: !this.state.edit })} className="btn btn-primary btn-lg">{this.state.edit ? 'Go Back' : 'Edit Information'}</button>
                    </p>
                </div>

            </div >
        );
    }
}

export default OnlineStore;