import React, { useEffect, useState } from "react";

export default function ReactFiniteScroll(props) {
  /* children 组件包裹的需要滚动加载的子组件。
      hasMore 是否有更多的数据需要加载，判断是否继续调用获取数据的回调函数。
      loadMore 获取数据的回调函数。
      scrollableParent 需要监听滚动事件的组件Dom对象。
  */
  const { children, hasMore, loadMore, scrollableParent } = props;

  const [clientHeight, setClientHeight] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(1);
  const [scrollTop, setScrollTop] = useState(0);

  // 防抖函数
  const debounce = (fn, wait) => {
    let timer = null;

    return function () {
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
  };

  // 使用原生js获取dom监听滚动事件实现滚动加载数据。
  const listenScroll = function (e) {
    let targetDom = e.target;

    setClientHeight(targetDom.clientHeight);
    setScrollHeight(targetDom.scrollHeight);
    setScrollTop(targetDom.scrollTop);
  };

  useEffect(() => {
    // console.log(scrollHeight, clientHeight, scrollTop, "getNewData =============");
    if (scrollHeight - clientHeight - scrollTop === 0 && hasMore) {
      // console.log(hasMore, 'getNewData =============');
      loadMore();
    }
  }, [scrollTop]);

  useEffect(() => {
    // 需要在dom渲染出来之后再加上监听事件，不然会not find addEventListener。
    scrollableParent && scrollableParent.addEventListener("scroll", debounce(listenScroll, 500));
    scrollableParent && scrollableParent.addEventListener("scroll", debounce(listenScroll, 500));
    return function clear() {
      // 组件卸载时卸载监听事件防止内存溢出
      scrollableParent && scrollableParent.removeEventListener(
        "scroll",
        debounce(listenScroll, 500)
      );
    };
  }, [scrollableParent]);

  return <>{children}</>;
}