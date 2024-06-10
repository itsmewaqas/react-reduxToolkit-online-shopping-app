import React, { useState, useEffect, useRef } from 'react';

function LocationSelect(props) {

    return (
        <select onChange={props.handleDropdown}>
            <option>Select</option>
            {props.menuData.map((item, index) => {
                return (
                    <option key={index} value={item}>{item}</option>
                )
            })}
        </select>
    );
}

export default LocationSelect;