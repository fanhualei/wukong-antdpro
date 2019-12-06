import React from 'react';
import css  from './test.css';
import img1 from '../imgs/1.png';

function C02_03() {
  var list=['一年级','二年级','三年级'];
  let listResult=list.map(function(value,key){
      return <li key={key}>{value}</li>
  })

  return (
    <div>
        <h1>如何引用CSS、IMG与内部函数</h1>
        <div className='color1' >this my first components</div>  
        <img src={img1} />
        {listResult}
    </div>
  );
}

export default C02_03;