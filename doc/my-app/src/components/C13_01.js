import React, { Component } from 'react';
import { Button,Icon } from 'antd';

class C13_01 extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div>
                <h1>antDesign 测试</h1>
                <Button type="primary">antd的按钮</Button>
                <Icon type="pic-right" theme="outlined" />
            </div>
        );
    }
}

export default C13_01;