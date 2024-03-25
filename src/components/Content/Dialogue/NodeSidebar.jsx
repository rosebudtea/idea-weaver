import React from 'react';

export default function NodeSidebar() {
    const onDragStart = (event, nodeType) => {
      event.dataTransfer.setData('application/reactflow', nodeType);
      event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <aside>
            <div className="dndnode start" onDragStart={(event) => onDragStart(event, 'startNode')} draggable>
                Start
            </div>
            <div className="dndnode end" onDragStart={(event) => onDragStart(event, 'endNode')} draggable>
                End
            </div>
            <div className="dndnode dialogue" onDragStart={(event) => onDragStart(event, 'dialogue')} draggable>
                Dialogue
            </div>
            <div className="dndnode choice" onDragStart={(event) => onDragStart(event, 'choice')} draggable>
                Choice
            </div>
            <div className="dndnode event" onDragStart={(event) => onDragStart(event, 'eventNode')} draggable>
                Event
            </div>
        </aside>
    );
}
