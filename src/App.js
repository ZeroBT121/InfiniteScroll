// import logo from './logo.svg';
import './App.css';
import React from 'react';
// import InfiniteScroll from './Components/InfiniteScroll';

// 使用原生js实现滚动加载
// import InfiniteScroll from './Components/InfiniteScroll2';
// import InfiniteScroll from './Components/InfiniteScroll2pro';

// 通过getScrollParent={(le) => document.querySelector('.ant-table-body')}监听该滚动条，存在多次调用的bug。
// import InfiniteScroll from './Components/InfiniteScroll3';

// 监听document.querySelector('.ant-table-tbody') 使用https://github.com/mezhanglei/react-awesome-infinite-scroll该组件。
import InfiniteScroll from './Components/InfiniteScroll4';

function App() {
  return (
    <div>
      <InfiniteScroll/>
    </div>
  );
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
