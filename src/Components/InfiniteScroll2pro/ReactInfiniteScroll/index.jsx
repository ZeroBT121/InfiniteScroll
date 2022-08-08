import React, { useEffect } from 'react'

export default function ReactFiniteScroll(props) {
  const { childer } = props
  useEffect(() => {
    console.log(childer,'==========');
  },[])
  return (
    // <div>ReactFiniteScroll</div>
    <></>
  )
}
