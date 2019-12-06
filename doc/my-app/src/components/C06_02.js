import React, { Component } from 'react';
class C06_02 extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    inputChange = (e) => {
        this.setState({
            username: e.target.value
        })

    }
    setUsername = () => {
        this.setState({
            username: '李四'
        })

    }


    render() {
        return (
            <div>
                <h2>双向绑定</h2>
                {/* model改变影响View    view改变反过来影响model  */}
                <input value={this.state.username} onChange={this.inputChange} />
                <p> {this.state.username}</p>
                <button onClick={this.setUsername}>改变username的值</button>
            </div>
        );
    }
}

export default C06_02;