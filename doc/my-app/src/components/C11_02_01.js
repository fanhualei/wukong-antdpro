import React, { Component } from 'react';

import {useParams} from "react-router-dom";


class C11_02_01 extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        console.log(this.props)

        return (
            <div>
                <h1>详细页：通过Url传值</h1>
                this.props.match.params.aid:<h2>{this.props.match.params.aid}</h2>
            </div>
        );
    }
}

export default C11_02_01;