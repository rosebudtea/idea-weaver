import React from 'react';
import { Handle, Position } from 'reactflow';

export default function DialogueNode() {
    const onChange = React.useCallback((evt) => {
      console.log(evt.target.value);
    }, []);
   
    return (
        <>
            <Handle type="target" position={Position.Top} id="top" />
            <Handle type="target" position={Position.Left} id="left" />
            <div id="dialogue-node">
                <input id="text" name="text" onChange={onChange} className="nodrag" />
                <textarea />
            </div>
            <Handle type="source" position={Position.Right} id="right" />
            <Handle type="source" position={Position.Bottom} id="bott" />
        </>
    );
}
