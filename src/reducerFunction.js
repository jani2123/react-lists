export const TOGGLE_SELECT_ITEM = "SELECT_ITEM";
export const MOVE_ITEMS_TO_LIST1 = "MOVE_ITEMS_TO_LIST1";
export const MOVE_ITEMS_TO_LIST2 = "MOVE_ITEMS_TO_LIST2";
export const CHANGE_FILTER = "CHANGE_FILTER";
export const CHANGE_SORT = "CHANGE_SORT";
export const HIDE_SUGGETIONS = "HIDE_SUGGETIONS";
export const AUTOCOMPLETE = "AUTOCOMPLETE";

const toggleSelected = (item) => {
  item.selected = !item.selected;
}
const moveItems = (state, srcKey, tgtKey, source, target) => {
  const items = structuredClone(source.filter((item) => item.selected));
  if (items.length === 0) {
    return state;
  }
  else {
    let newState = structuredClone(state);
    newState[srcKey].data = structuredClone(source.filter((item) => !item.selected));
    for (let i of items) {
      i.selected = false;
    }
    newState[tgtKey].data = [...structuredClone(target), ...items];
    return newState;
  }
}

const reducer = (state, {type, data}) => {
  // data.key is index of list
  switch (type) {
    case TOGGLE_SELECT_ITEM: {
      let newState = structuredClone(state);
      toggleSelected(newState[data.key].data[data.itemIndex]);
      return newState;
    }
    case MOVE_ITEMS_TO_LIST1: {
      return moveItems(state, "list2", "list1", state.list2.data, state.list1.data);
    }
    case MOVE_ITEMS_TO_LIST2: {
      return moveItems(state, "list1", "list2", state.list1.data, state.list2.data);
    }
    case CHANGE_FILTER: {
      let newState = structuredClone(state);
      newState[data.key].filterTerm = data.value;
      newState[data.key].showSuggestions = true;
      return newState;
    }
    case CHANGE_SORT: {
      let newState = structuredClone(state);
      // unsorted -> sorted, ascending -> sorted, descending
      if (state[data.key].sorted) {
        if (state[data.key].ascending)
          newState[data.key].ascending = false;
        else newState[data.key].sorted = false;
      }
      else {
        newState[data.key].sorted = true;
        newState[data.key].ascending = true;
      }
      /* newState[data.key].sorted = state[data.key].ascending || !state[data.key].sorted;
      newState[data.key].ascending = !state[data.key].sorted; */
      return newState;
    }
    case HIDE_SUGGETIONS: {
      if (state[data.key].showSuggestions === true) {
        let newState = structuredClone(state);
        newState[data.key].showSuggestions = false;
        return newState;
      }
      else {
        return state;
      }
    }
    case AUTOCOMPLETE: {
      let newState = structuredClone(state);
      newState[data.key].showSuggestions = false;
      newState[data.key].filterTerm = data.value;
      return newState;
    }
    default:
      throw Error("Undefinded action: " + type);
  }
}

export default reducer;