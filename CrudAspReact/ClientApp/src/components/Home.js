import React, { Component } from "react"
import { Link } from 'react-router-dom';

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <div>
                <h1>Home Page</h1>
            </div>
        );
    }
}
