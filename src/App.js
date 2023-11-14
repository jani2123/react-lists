import './App.css';
import ArrowButton from './ArrowButton';
import List from './List';
import React, { useReducer, useEffect } from 'react';
import reducer, {MOVE_ITEMS_TO_LIST1, MOVE_ITEMS_TO_LIST2} from './reducerFunction'

function App() {

  const [state, dispatch] = useReducer(reducer, {
    list1: {
      key: "list1",
      name: "List 1",
      data: [
      { text: 'Emily', selected: false },
      { text: 'Benjamin', selected: false },
      { text: 'Sophia', selected: false },
      { text: 'William', selected: false },
      { text: 'Olivia', selected: false },
      { text: 'James', selected: false }],
      sorted: false,
      ascending: false,
      filterTerm: '',
      showSuggestions : false
    },
    list2: {
      key: "list2",
      name: "List 2",
      data: [
      { text: 'Ava', selected: false },
      { text: 'Samuel', selected: false },
      { text: 'Mia', selected: false },
      { text: 'Jacob', selected: false }],
      sorted: false,
      ascending: false,
      filterTerm: '',
      showSuggestions : false
    }
  });


  const handleKey = (event) => {
    if (event.keyCode === 39) { //right
      dispatch({type: MOVE_ITEMS_TO_LIST2});
    }
    if (event.keyCode === 37) { //left
      dispatch({type: MOVE_ITEMS_TO_LIST1});
    }
  };

  useEffect(() => {
      window.addEventListener("keydown", handleKey);
      return () => {
          window.removeEventListener("keydown", handleKey);
      };
    },[/* keep track of needed parameters inside called functions */]
  );

  return (
    <div className="App">
      <div></div>
      <List ownState={state.list1} handler={dispatch}/>
      <div className='flex-column'>
        <ArrowButton enabled={state.list1.data.some((item) => item.selected === true)} handler={dispatch}/>
        <ArrowButton enabled={state.list2.data.some((item) => item.selected === true)} handler={dispatch} flip={true}/>
      </div>
      <List ownState={state.list2} handler={dispatch}/>
      <div></div>
    </div>
  );
}

export default App;
