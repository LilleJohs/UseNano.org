import React, { Component } from 'react';
import axios from 'axios';

class ApproveStore extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false,
            userid: '',
            data: {},
            selected: -1
        };
    }

    onChange(e) {
        this.setState({ userid: e.target.value });
    }

    async onClick() {
        let url;
        if (process.env.NODE_ENV === 'production') {
            url = `https://usenano.org/approveUserAuth?userid=${this.state.userid}`;
        } else {
            url = `http://localhost:5000/approveUserAuth?userid=${this.state.userid}`;
        }
        const response = await axios.get(url);
        if (response.status === 200) {
            this.setState({ loggedIn: true, data: response.data });
        }
    }

    websiteClick(i) {
        if (this.state.selected === i) {
            this.setState({ selected: -1 });
        } else {
            this.setState({ selected: i });
        }
    }

    async acceptStore(store, i) {
        console.log(store);

        let url;
        if (process.env.NODE_ENV === 'production') {
            url = `https://usenano.org/approveStoreAuth?userid=${this.state.userid}&storeid=${store._id}`;
        } else {
            url = `http://localhost:5000/approveStoreAuth?userid=${this.state.userid}&storeid=${store._id}`;
        }
        const response = await axios.get(url);
        if (response.status === 200) {
        }
    }

    showUnapprovedStores() {
        const state = this.state;
        if (!state.loggedIn) { return; }
        let allStores = [];
        for (var i = 0; i < state.data.length; i++) {
            const store = state.data[i];
            allStores.push(
                <div key={store.name} className="card">
                    <div className="card-header" id={store.name}>
                        <h1 style={{ cursor: 'pointer' }} align="center" onClick={this.websiteClick.bind(this, i)}>
                            {store.name}
                        </h1>
                    </div>
                    {this.state.selected === i && this.showSelected(store, i)}
                </div>
            );
        }
        return allStores;
    }

    showSelected(store, i) {
        return (
            <div className="card-body">
                <h4 className="card-title" align="center">
                    {store.website}
                </h4>
                <div className="btn-tooltip">
                    <h4 onClick={this.acceptStore.bind(this, store, i)} className="btn btn-info btn-lg" >Accept</h4>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div align="center" className="container">
                <div className="input-group mb-3">
                    <input onChange={this.onChange.bind(this)} type="text" className="form-control" value={this.state.userid} aria-label="Id" aria-describedby="basic-addon2" />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" onClick={this.onClick.bind(this)}>Log In</button>
                    </div>
                </div>
                <div >
                    {this.showUnapprovedStores()}
                </div>
            </div>
        );
    }
}

export default ApproveStore;
