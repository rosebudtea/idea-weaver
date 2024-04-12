import React from 'react';
import { Handle, Position } from 'reactflow';

export default function StartConversationNode({selected}) {
    return (
        <>
            <div id="start-node">
                <p>START</p>
            </div>
            <Handle type="source" position={Position.Right} id="right" />
            <Handle type="source" position={Position.Bottom} id="bott" />
        </>
    );
}
