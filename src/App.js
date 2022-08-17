// import logo from './logo.svg';
import './App.css';
import React from 'react';
// import InfiniteScroll from './Components/InfiniteScroll';

// 使用原生js监听事件封装组件实现滚动加
import InfiniteScroll from './Components/InfiniteScroll';

// 通过getScrollParent={(le) => document.querySelector('.ant-table-body')}监听该滚动条，存在多次调用的bug。
// import InfiniteScroll from './Components/InfiniteScroll2';

// 监听document.querySelector('.ant-table-tbody') 使用https://github.com/mezhanglei/react-awesome-infinite-scroll该组件。
// import InfiniteScroll from './Components/InfiniteScroll3';

function App() {
  return (
    <div>
      <InfiniteScroll/>
    </div>
  );
}

export default App;
