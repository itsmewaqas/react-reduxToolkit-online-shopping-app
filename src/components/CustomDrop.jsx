import React, { useState, useEffect, useRef } from 'react';

function CustomDrop(props) {

    const [menuState, SetmenuState] = useState(false);

    const menuVisibility = useRef(null)
    const closeOpenMenus = (e) => {
        if (menuVisibility.current && menuState && !menuVisibility.current.contains(e.target)) {
            SetmenuState(false)
        }
    }
    document.addEventListener('mousedown', closeOpenMenus)

    const showMenu = () => {
        SetmenuState(!menuState)
    }

    return (
        <div className='customDrop' ref={menuVisibility}>
            <button onClick={() => showMenu()}>
                <img className='leftImg' src={props.categoryIcon} />
                <dd>{props.selectFinalValue}</dd>
                <img className='rightiImg' src={menuState == false ? require('../assets/images/arrow1.png') : require('../assets/images/arrow2.png')} alt='' />
            </button>
            {menuState &&
                <ul>
                    {props.length == 0 ? 'data not found'
                        :
                        props.data?.map((item, index) => (
                            <li key={index} onClick={() => props.selectRandomValue(item)} style={props.widthSet}>
                                {Object.keys(item).map((key, i) => {
                                    if (key !== 'id') {
                                        return <a onClick={() => SetmenuState(false)}
                                            key={i}>{item[key]}</a>
                                    }
                                })}
                            </li>
                        ))}
                </ul>
            }
        </div>
    );
}

export default CustomDrop;