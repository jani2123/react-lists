import './List.css';
import {TOGGLE_SELECT_ITEM, CHANGE_FILTER, CHANGE_SORT, HIDE_SUGGETIONS, AUTOCOMPLETE} from './reducerFunction';

function List({ownState, handler}) {

    function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const filteredList = ownState.data.map((item, index) => ({index: index, text: item.text, selected: item.selected}))
        .filter(item => item.text.toLowerCase().startsWith(ownState.filterTerm.toLowerCase())
    );

    const sortedList = ownState.sorted ?
        filteredList.sort(
            (a, b) => { return a.text > b.text ? 
            (ownState.ascending ? 1 : -1) : 
            (ownState.ascending ? -1 : 1);}
        ) : filteredList
    ;

    return (
        <div>
          <h2>{ownState.name}</h2>
            <div className="autocomplete">
                <input
                    type="text"
                    placeholder="Filter"
                    value={ownState.filterTerm}
                    onChange={(e) => handler({type: CHANGE_FILTER, data: {key: ownState.key, value: e.target.value}})}
                    onBlur={() => wait(100).then(() => handler({type: HIDE_SUGGETIONS, data: {key: ownState.key}}))}
                />
                {ownState.showSuggestions && (
                    <div className='autocomplete-items'>
                        {ownState.data.map((item, index) => ({index: index, text: item.text}))
                        .filter(option => option.text.toLowerCase().startsWith(ownState.filterTerm.toLowerCase()))
                        .sort((a, b) => { return a.text > b.text ? 1 : -1;})
                        .map((option) => (
                        <div key={option.index} onClick={() => handler({type: AUTOCOMPLETE, data: {key: ownState.key, value: option.text}})}>
                            {option.text}
                        </div>
                        ))}
                    </div>
                )}
            </div>
          <table>
            <thead>
                <tr>
                    <th onClick={() => handler({type: CHANGE_SORT, data: {key: ownState.key}})}>
                        Name {ownState.sorted ? (ownState.ascending ? '↓' : '↑') : '↓↑'}
                    </th>
                </tr>
            </thead>
            <tbody>
              {ownState.data.length === 0 ? <tr><td className='unselectable'>This list has no items</td></tr> :
                sortedList.map((item) => (
                  <tr key={item.index}>
                    <td className={item.selected ? 'selected': undefined} onClick={() => handler({type: TOGGLE_SELECT_ITEM, data: {key: ownState.key, itemIndex: item.index}})}>
                      {item.text}
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
    );
}

export default List;