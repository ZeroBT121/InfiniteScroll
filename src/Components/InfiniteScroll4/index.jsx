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
      // width: '250px',
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

  const getData = (page) => {
    setLoading(true)
    setTimeout(()=>{
      setData(allData.slice(0,page*pageNum));
      setLoading(false)
    },1000);
  };

  const handleInfiniteOnLoad = () => {
    console.log('hasMore',hasMore,'handleInfiniteOnLoad===');
    setPage(pre => pre+1)
    setHasMore(data.length < allData.length-10)
    console.log('hasMore',hasMore,'data.length',data.length,'allData.length',allData.length,'======');
    getData(page+1);
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

  useEffect(() => {
    createAllData(100);
  }, []);

  useEffect(() => {
    getData(page);
  }, [allData,page]);

  return (
    <div className='main'>
      <h1>InfiniteScroll</h1>
      <div className='tableScroll'>
        <ReactInfiniteScroll
            initialLoad={false}
            pageStart={1}
            loadMore={handleInfiniteOnLoad}
            hasMore={hasMore}
            useWindow={false}
            // element={'tbody'}
            // getScrollParent={(le) => document.querySelector('.ant-table-body')}
            getScrollParent={() => document.getElementsByClassName('ant-table-tbody')[0]}
        >
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                loading={loading}
                // scroll={{x: 900,y:500}}
                scroll={{x: 900}}
                // scroll={{y:500}}
            >
            </Table>
        </ReactInfiniteScroll>
      </div>
    </div>
    
  )
}
