import React, { useState } from 'react';

function CustomContainers(props) {
    return (
        <div className="customContainer clearfix">
            <h1>{props.title}</h1>
            {props.children}
        </div>
    );
}

export { CustomContainers };
