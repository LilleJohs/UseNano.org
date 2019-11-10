import React, { Component } from 'react';
import axios from 'axios';

class ApproveStore extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false,
            id: '',
            data: {},
            selected: -1
        };
    }

    onChange(e) {
        this.setState({ id: e.target.value });
    }

    async onClick() {
        let url;
        if (process.env.NODE_ENV === 'production') {
            url = 'https://usenano.org/approveStoreAuth?id=';
        } else {
            url = 'http://localhost:5000/approveStoreAuth?id=';
        }
        url += this.state.id;
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
                    {this.state.selected === i && this.showSelected(store)}
                </div>
            );
        }
        return allStores;
    }

    showSelected(store) {
        return (
            <div className="card-body">
                <h4 className="card-title" align="center">
                    {store.website}
                </h4>
            </div>
        );
    }

    render() {
        return (
            <div align="center" className="container">
                <div className="input-group mb-3">
                    <input onChange={this.onChange.bind(this)} type="text" className="form-control" value={this.state.id} aria-label="Id" aria-describedby="basic-addon2" />
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
