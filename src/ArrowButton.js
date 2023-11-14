import './ArrowButton.css';

import {MOVE_ITEMS_TO_LIST1, MOVE_ITEMS_TO_LIST2} from './reducerFunction'

function ArrowButton({enabled, handler, flip}) {
    const topClasses = "tailed-arrow" + (enabled ? ' enabled' : '') + (flip ? ' flipped' : '');
    return (
        <div className={topClasses} onClick={ enabled ? () => handler({type: flip ? MOVE_ITEMS_TO_LIST1 : MOVE_ITEMS_TO_LIST2}) : undefined}>
            <div className="arrow-head-outline"></div>
            <div className="arrow-tail-outline"></div>
            <div className="arrow-head"></div>
            <div className="arrow-tail"></div>
        </div>
    );
}

export default ArrowButton;