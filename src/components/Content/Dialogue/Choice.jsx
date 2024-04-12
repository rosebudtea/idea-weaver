import React, {useRef, useState} from 'react';

export default function Choice({label, position, onUpdate, onRemove}) {
    return (
        <div id="node-choice">
            <input type='text' value={label} onChange={(e) => onUpdate(position, e.target.value)} />
            <button onClick={() => onRemove(position)}>-</button>
        </div>
    );
}
