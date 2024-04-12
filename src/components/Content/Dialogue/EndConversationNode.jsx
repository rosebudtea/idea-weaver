import React from 'react';
import { Handle, Position } from 'reactflow';

export default function EndConversationNode({selected}) {
    return (
        <>
            <Handle type="target" position={Position.Top} id="top" />
            <Handle type="target" position={Position.Left} id="left" />
            <div id="end-node">
                <p>END</p>
            </div>
        </>
    );
}
