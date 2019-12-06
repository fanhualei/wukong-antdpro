import React from 'react';

import css  from './test.css';
import img1 from '../imgs/1.png';

class C03_01 extends React.Component{
    constructor(props){
        super(props);   //固定写法
        this.state={
            msg:'我是一个home组件',
        }
    }

    render(){
        var list=['11111111111','222222222222','3333333333333'];
        let listResult=list.map(function(value,key){
            return <li key={key}>{value}</li>
        })
        return(
            <div>
            <h1>class组件的写法</h1>
            <div className='color1' >this my first components</div>  
            <img src={img1} />
            {listResult}
        </div>
        );
    }
}


export default C03_01;