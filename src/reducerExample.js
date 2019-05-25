import React, { Fragment, useState, useReducer } from 'react';
//import {Store} from './Store/Store'

export default function App() {
  //const store = React.useContext(Store)

  const reducer = (state, action) => {
    console.log(state)
    switch (action) {
      case 'ADD': {
        return state + 1
      }
      case 'REM': {
        return state - 1
      }
      case 'RES': {
        return state = 0
      }
    }
    return state
  }
  const [count, dispatch] = useReducer(reducer, 0)
  return (
    <Fragment>
      <div>
        {count}
      </div>
      <button onClick={() => dispatch('ADD')}>+</button>
      <button onClick={() => dispatch('REM')}>-</button>
      <button onClick={() => dispatch('RES')}>reset</button>
    </Fragment>
  ); 
}


