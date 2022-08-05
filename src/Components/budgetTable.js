/**
 * 创建人：温恒毅
 * 创建时间：2018/8/21
 * 描述：
 */

import React, {Component} from 'react';
import {Table, Tooltip} from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import {BigNumber} from 'bignumber.js';
import { getComponentId } from '@utils/common';
import style from './budgetTable.less';
import AmountInput from '../common/amountNumberInput';
const { Column, ColumnGroup } = Table;

class BudgetTable extends Component {
    constructor(props){
        super(props);

        this.state = {
            rowPageList: [],
            columnList: [],
            dataList: [],
            dataStore: []
        }
    }

    componentDidMount(){
        this.setState({
            rowPageList: this.props.rowPageList,
            columnList: this.props.columnList,
            dataList: this.props.dataList
        });
        let dataStore = this.initComposeData(this.props.rowPageList, this.props.dataList);
        this.setState({
            dataStore
        });
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            rowPageList: nextProps.rowPageList,
            columnList: nextProps.columnList,
            dataList: nextProps.dataList
        });
        let dataStore = this.initComposeData(nextProps.rowPageList, nextProps.dataList);
        this.setState({
            dataStore
        });
    }

    //生成列头
    initColumns = (data) => {
        let {componentId} = this.props;
        let columns = [];
        if(data && data.length > 0){
            let length = data.length;
            for (let i = length -1 ; i >= 0; i--){
                let cols = [];
                let dataI = data[i];
                for(let j in dataI){
                    if(j !== "key") {
                        let dataItem = data[i][j];
                        if (i === length - 1) {
                            if(dataItem){
                                let nbsp = '';
                                for(let l = 0; l < dataItem.indent; l++){
                                    nbsp = nbsp + <span></span>;
                                }
                                let indent = [];
                                if(dataItem.indent){
                                    indent = new Array(dataItem.indent).fill(null);
                                }
                                let col = {
                                    title: (
                                        dataItem && dataItem.text && dataItem.display ?
                                            <div className={length > 1 && i !== 0 ? style.more_title : style.title}>
                                                {
                                                    indent.map((item, index)=>{
                                                        return <div className={style.br} key={index}/>
                                                    })
                                                }
                                                <div className={style.text}>{dataItem.text}</div>
                                            </div> : ""
                                    ),
                                    dataIndex: j,
                                    key: j,
                                    className: style.span_width,
                                   // className: dataItem.display ? (dataItem.allLeafed ? style.isleaf : style.display) : style.basic,
                                    render: (text, record) => {

                                        return text ?
                                            <AmountInput
                                                data={text}
                                                changeValue={this.props.changeValue}
                                                numChange={this.numChange}
                                                record={record}
                                                componentId={getComponentId('amount' + i, componentId)}
                                            />
                                            : <div className={style.empty}></div>;
                                    }
                                }
                                cols.push(col);
                            } else {
                                let col = {
                                    title: "",
                                    dataIndex: j,
                                    key: j,
                                    className: style.span_width,
                                    //className: style.empty,
                                    render: (text, record) => {
                                        return text ?
                                            <AmountInput
                                                data={text}
                                                changeValue={this.props.changeValue}
                                                numChange={this.numChange}
                                                record={record}
                                                conponentId={getComponentId('amount' + i, componentId)}
                                            />
                                            : <div className={style.empty}></div>;;
                                    }

                                }
                                cols.push(col);
                            }

                        } else {
                            let indent = [];
                            if(dataItem.indent){
                                indent = new Array(dataItem.indent).fill(null);
                            }
                            let col = {
                                title: (
                                    dataItem && dataItem.text && dataItem.display ?
                                        <div className={style.title}>
                                            {
                                                indent.map((item, index)=>{
                                                    return <div className={style.br} key={index}/>
                                                })
                                            }
                                            <div>{dataItem.text}</div>
                                        </div> : ""
                                ),
                                dataIndex: j,
                                key: j,
                                className: style.span_width,
                                // className: dataItem.display ? style.display : style.basic,
                                children: []
                            }
                            cols.push(col);
                        }
                    }
                }
                if(columns.length === 0 || length === 1){
                    columns = cols;
                } else {
                    columns = cols.map((item, index) => {
                        item.children.push(columns[index]);
                        return item;
                    });
                }
            }
        }
        return columns;
    }

    //合成行列数据列头
    initComposeClumns = (row, column) => {
        let rowColumns = [];
        if(row && row.length > 0){
            for(let i in row[0]){
                if(i !== "key" ){
                    let col = {
                        title: '',
                        dataIndex: i,
                        key: i,
                        className: style.row,
                        // fixed: true,
                        render: (text, record) => {
                            let nbsp = '';
                            if (text && text.indent) {
                                for (let i = 0; i < text.indent; i++) {
                                    nbsp = nbsp + '\u00A0\u00A0\u00A0\u00A0';
                                }
                            }
                            return <Tooltip placement="topLeft" title={text && text.text && text.display ? `${text.text}` : '' }>
                                <div className={style.span}><div className={style.text_content}>{text && text.text && text.display ? `${nbsp}${text.text}` : '' }</div></div>
                            </Tooltip>;
                            // <div className={style.span}>{text && text.text && text.display? `${nbsp}${text.text}` : "" }</div>
                        }
                    };
                    rowColumns.push(col);
                }
            }
        }

        let colColumns = this.initColumns(column);
        return [...rowColumns, ...colColumns];
    }
    // 合成数据
    initComposeData = (row, data) => {
        return row.map((item, index) => {
            return Object.assign(data[index], item);
        });
    }

    handleInfiniteOnLoad = (pageNum) => {
        this.props.getCompileData(pageNum, true);
    }

    numChange = (item, record) => {
        if(item.columnChildren){
            this.apportionmentCount(item, record);
        }
        if(item.columnParent){
            this.aggregateCount(item, record);
        }
        this.setState({
            dataStore:this.state.dataStore
        });
    }

    //向上汇总
    aggregateCount = (data, record) => {
        let parentValue = record[data.columnParent];
        if(data.columnBrothers){
            let t = data.columnBrothers.reduce((total, child) => {
                let a = new BigNumber(total);
                let b = new BigNumber(record[child].budgetAmount);
                return a.plus(b).toFixed(child.precision).toString();
            }, data.budgetAmount);
            parentValue.budgetAmount= t;
            parentValue.budgetAmountPlain = t;
            if(parentValue.columnParent){
                this.aggregateCount(parentValue, record);
            }
        }
    }

    //向下分摊
    apportionmentCount = (data, record) => {
        let children = data.columnChildren;
        let childrenLength = children.length;
        let currentData = data.budgetAmount;
        let d = new BigNumber(currentData);
        let commonValue = d.dividedBy(childrenLength);
        
        let v1 = commonValue.toFixed(data.precision, BigNumber.ROUND_DOWN).toString();
        let v2 = commonValue.toFixed(data.precision, BigNumber.ROUND_UP).toString();
        let v3 = d.minus(v1).minus(v2).toString();

        if(parseFloat(v2) > parseFloat(v3) && children.length === 3){
            let temp = v2;
            v2 = v3;
            v3 = temp;
        }

        children.forEach((item, index)=> {
            let child = record[item];
            if(index === 0){
                child.budgetAmount = v1;
                child.budgetAmountPlain = v1;
            } else if(index === 1) {
                child.budgetAmount = v2;
                child.budgetAmountPlain = v2;
            } else {
                child.budgetAmount = v3;
                child.budgetAmountPlain = v3;
            }
            
            if(child.columnChildren){
                this.apportionmentCount(child, record);
            } else {
                this.props.changeValue(child);
            }
        });
    }

    render() {
        const {constances, loading, hasMore} = this.props;
        const {rowPageList, columnList, dataStore} = this.state;
        const columns = this.initComposeClumns(rowPageList, columnList);
        return (
            <div className={style.budget_tables}>
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={1}
                    loadMore={this.handleInfiniteOnLoad}
                    hasMore={!loading && hasMore}
                    useWindow={false}
                    className={style.scroll}
                >
                    <Table
                        columns={columns}
                        dataSource={dataStore}
                        pagination={false}
                        className={style.table}
                        rowClassName={style.row}
                        locale={{emptyText: constances.emptyText}}
                    />
                </InfiniteScroll>
            </div>
        )
    }
}

export default BudgetTable;


