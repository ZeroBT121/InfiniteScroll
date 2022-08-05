import React, { useEffect, useState, useRef} from 'react'
import './index.css'
// import Button from 'antd/lib/button';
// import { Table, Divider, Tag } from 'antd';
import Table from 'antd/lib/table';
import Divider from 'antd/lib/divider';
import Tag from 'antd/lib/tag';
import ReactInfiniteScroll from 'react-infinite-scroller';

export default function InfiniteScroll(props) {
  // let {loading, hasMore} = props
  // let loading = false,
  // hasMore = true;
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [page, setPage] = useState(1);
  const pageRef = useRef(1)
  const pageNum = 10

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '105px',
      fixed: 'left',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <span>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a>Invite {record.name}</a>
          <Divider type="vertical" />
          <a>Delete</a>
        </span>
      ),
    },
  ];

  const createAllData = (num) => {
    let arr = [];
    for (let i = 0; i < num; i++) {
      arr.push({
        key: i,
        name: 'John Brown',
        age: i,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
      });
    }
    setAllData(arr);
  };
  // const allData = [
  //   {
  //     key: '1',
  //     name: 'John Brown',
  //     age: 32,
  //     address: 'New York No. 1 Lake Park',
  //     tags: ['nice', 'developer'],
  //   },
  //   {
  //     key: '2',
  //     name: 'Jim Green',
  //     age: 42,
  //     address: 'London No. 1 Lake Park',
  //     tags: ['loser'],
  //   },
  //   {
  //     key: '3',
  //     name: 'Joe Black',
  //     age: 32,
  //     address: 'Sidney No. 1 Lake Park',
  //     tags: ['cool', 'teacher'],
  //   },
  //   {
  //     key: '4',
  //     name: 'Joe Black',
  //     age: 32,
  //     address: 'Sidney No. 1 Lake Park',
  //     tags: ['cool', 'teacher'],
  //   },
  //   {
  //     key: '5',
  //     name: 'Joe Black',
  //     age: 32,
  //     address: 'Sidney No. 1 Lake Park',
  //     tags: ['cool', 'teacher'],
  //   },
  //   {
  //     key: '6',
  //     name: 'Joe Black',
  //     age: 32,
  //     address: 'Sidney No. 1 Lake Park',
  //     tags: ['cool', 'teacher'],
  //   },
  //   {
  //     key: '7',
  //     name: 'Joe Black',
  //     age: 32,
  //     address: 'Sidney No. 1 Lake Park',
  //     tags: ['cool', 'teacher'],
  //   },
  //   {
  //     key: '8',
  //     name: 'Joe Black',
  //     age: 32,
  //     address: 'Sidney No. 1 Lake Park',
  //     tags: ['cool', 'teacher'],
  //   },
  //   {
  //     key: '9',
  //     name: 'Joe Black',
  //     age: 32,
  //     address: 'Sidney No. 1 Lake Park',
  //     tags: ['cool', 'teacher'],
  //   },
  //   {
  //     key: '10',
  //     name: 'Joe Black',
  //     age: 32,
  //     address: 'Sidney No. 1 Lake Park',
  //     tags: ['cool', 'teacher'],
  //   },
  //   {
  //     key: '11',
  //     name: 'Joe Black',
  //     age: 32,
  //     address: 'Sidney No. 1 Lake Park',
  //     tags: ['cool', 'teacher'],
  //   },
  //   {
  //     key: '12',
  //     name: 'Joe Black',
  //     age: 32,
  //     address: 'Sidney No. 1 Lake Park',
  //     tags: ['cool', 'teacher'],
  //   },
  //   {
  //     key: '13',
  //     name: 'Joe Black',
  //     age: 32,
  //     address: 'Sidney No. 1 Lake Park',
  //     tags: ['cool', 'teacher'],
  //   },
  //   {
  //     key: '14',
  //     name: 'Joe Black',
  //     age: 32,
  //     address: 'Sidney No. 1 Lake Park',
  //     tags: ['cool', 'teacher'],
  //   },
  //   {
  //     key: '15',
  //     name: 'Joe Black',
  //     age: 32,
  //     address: 'Sidney No. 1 Lake Park',
  //     tags: ['cool', 'teacher'],
  //   },
  //   {
  //     key: '16',
  //     name: 'Joe Black',
  //     age: 32,
  //     address: 'Sidney No. 1 Lake Park',
  //     tags: ['cool', 'teacher'],
  //   },
  //   {
  //     key: '17',
  //     name: 'Joe Black',
  //     age: 32,
  //     address: 'Sidney No. 1 Lake Park',
  //     tags: ['cool', 'teacher'],
  //   },
  //   {
  //     key: '18',
  //     name: 'Joe Black',
  //     age: 32,
  //     address: 'Sidney No. 1 Lake Park',
  //     tags: ['cool', 'teacher'],
  //   },
  //   {
  //     key: '19',
  //     name: 'Joe Black',
  //     age: 32,
  //     address: 'Sidney No. 1 Lake Park',
  //     tags: ['cool', 'teacher'],
  //   },
  //   {
  //     key: '20',
  //     name: 'Joe Black',
  //     age: 32,
  //     address: 'Sidney No. 1 Lake Park',
  //     tags: ['cool', 'teacher'],
  //   },
  // ];

  const getData = (page) => {
    setLoading(true)
    setTimeout(()=>{
      setData(allData.slice(0,page*pageNum));
      setLoading(false)
    },1000);
  };

  const handleInfiniteOnLoad = () => {
    console.log(loading,hasMore,'handleInfiniteOnLoad===');
    setPage(pre => pre+1)
    setHasMore(data.length < allData.length)
    console.log(hasMore,data.length,allData.length,'======');
  };

  // 防抖函数
  const debounce = (fn, wait) => {
    let timer = null;

    return function() {
      let context = this,
          args = arguments;

      // 如果此时存在定时器的话，则取消之前的定时器重新记时
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }

      // 设置定时器，使事件间隔指定事件后执行
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, wait);
    };
  }

  // 使用原生js获取dom监听滚动事件实现滚动加载数据。
  const listenScroll = (e) => {
    let targetDom = e.target
    const clientHeight = targetDom.clientHeight;
    const scrollHeight = targetDom.scrollHeight;
    const scrollTop = targetDom.scrollTop;

    // console.log(clientHeight,scrollHeight,scrollTop,'=============');

    if((scrollHeight - clientHeight - scrollTop === 0) && ((allData.length/pageNum) > pageRef.current)) {
      // console.log(pageRef.current,'=============');
        setPage(pre => pre+1)
        pageRef.current += 1
    }
  }

  useEffect(() => {
    // listenScroll();
    document.getElementsByClassName('ant-table-body')[0].addEventListener('scroll', debounce(listenScroll,500) )
  }, [allData]);

  useEffect(() => {
    createAllData(100);
  }, []);

  useEffect(() => {
    getData(page);
  }, [page,allData]);

  return (
    <div className='main'>
      <h1>InfiniteScroll</h1>
      <ReactInfiniteScroll
          initialLoad={false}
          pageStart={1}
          loadMore={handleInfiniteOnLoad}
          // hasMore={!loading && hasMore}
          hasMore={false}
          useWindow={false}
      >
          <Table
              columns={columns}
              dataSource={data}
              pagination={false}
              loading={loading}
              scroll={{x: 900,y:500}}
          />
      </ReactInfiniteScroll>
    </div>
    
  )
}
