import React from 'react';
function C02_02(props) {
  const {name,title} = props;
  return (
    <div>
        <h2>带参数的组件</h2>
        name:{name} --title:{title}  
    </div>
  );
}
export default C02_02;