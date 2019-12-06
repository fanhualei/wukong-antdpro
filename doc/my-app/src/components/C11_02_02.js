import React, { Component } from 'react';


import url from 'url';

class C11_02_02 extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }




    render() {
        var query=url.parse(this.props.location.search,true).query;


        return (
            <div>
                <h1>详细页：通过?传值</h1>
                aid:{query.aid} <br/>
                bid:{query.bid}
                
            </div>
        );
    }
}

export default C11_02_02;