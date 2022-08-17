import React, { useEffect, useState, useRef} from 'react'
import './index.css'
// import Button from 'antd/lib/button';
// import { Table, Divider, Tag } from 'antd';
import Table from 'antd/lib/table';
import Divider from 'antd/lib/divider';
import Tag from 'antd/lib/tag';
import ReactInfiniteScroll from './ReactInfiniteScroll';

export default function InfiniteScroll(props) {
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [page, setPage] = useState(1);
  const pageRef = useRef(1)
  // 一次加载10条数据
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

  const getData = (page) => {
    setLoading(true)
    setTimeout(()=>{
      setData(allData.slice(0,page*pageNum));
      setLoading(false)
    },1000);
  };

  const handleInfiniteOnLoad = () => {
    console.log(pageRef.current,allData,  '调用了handleInfiniteOnLoad');
    if (pageRef.current < 10) {
      setHasMore(true)
      setPage(pre => pre+1)
      pageRef.current += 1
    } else {
      setHasMore(false)
    }
  }

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
        loadMore={handleInfiniteOnLoad}
        scrollableParent={document.getElementsByClassName("ant-table-body")[0]}
        hasMore={hasMore}
      >
        <Table
              columns={columns}
              dataSource={data}
              pagination={false}
              loading={loading}
              scroll={{x: 900,y:500}}
              // scroll={{y:500}}
          />
      </ReactInfiniteScroll>
    </div>
    
  )
}
