import React, { useCallback, useRef, useState } from 'react';
import ReactFlow, {
    MiniMap,
    Controls,
    useNodesState,
    useEdgesState,
    addEdge,
    useReactFlow,
    ReactFlowProvider,
    MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import DialogueNode from './DialogueNode.jsx';
import ChoiceNode from './ChoiceNode.jsx';
import EventNode from './EventNode.jsx';
import StartConversationNode from './StartConversationNode.jsx';
import EndConversationNode from './EndConversationNode.jsx';
import NodeSidebar from './NodeSidebar.jsx';

const initialNodes = [];

const nodeTypes = { startNode: StartConversationNode, endNode: EndConversationNode, dialogue: DialogueNode, choice: ChoiceNode, eventNode: EventNode };

let id = 1;
const getId = () => `${id++}`;

const FlowController = () => {
    const reactFlowWrapper = useRef(null);
    const connectingNodeId = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const { screenToFlowPosition } = useReactFlow();
    const onConnect = useCallback(
        (params) => {
            // reset the start node on connections
            connectingNodeId.current = null;
            console.log(params);
            const newParams = {...params, markerEnd: {type: MarkerType.ArrowClosed,},}
            setEdges((eds) => addEdge(newParams, eds));
        },
        [],
    );

    const onConnectStart = useCallback((_, { nodeId }) => {
        connectingNodeId.current = nodeId;
    }, []);

    const onConnectEnd = useCallback(
        (event) => {
            if (!connectingNodeId.current) return;

            const targetIsPane = event.target.classList.contains('react-flow__pane');

            if (targetIsPane) {
                // we need to remove the wrapper bounds, in order to get the correct position
                const id = getId();
                const newNode = {
                    id,
                    type: 'dialogue',
                    position: screenToFlowPosition({
                        x: event.clientX,
                        y: event.clientY,
                    }),
                    data: { label: `Node ${id}` },
                    origin: [0.5, 0.0],
                };

                setNodes((nds) => nds.concat(newNode));
                setEdges((eds) =>
                    eds.concat({ id, source: connectingNodeId.current, target: id, markerEnd: {type: MarkerType.ArrowClosed,}, }),
                );
            }
        },
        [screenToFlowPosition],
    );

    const onDragOver = useCallback((event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const type = event.dataTransfer.getData('application/reactflow');

            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
                return;
            }

            // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
            // and you don't need to subtract the reactFlowBounds.left/top anymore
            // details: https://reactflow.dev/whats-new/2023-11-10
            const position = reactFlowInstance.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });
            const newNode = {
                id: getId(),
                type,
                position,
                data: { label: `${type} node` },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance],
    );

    return (
        <div className="wrapper" ref={reactFlowWrapper} style={{ height: '100%', width: '100%' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onConnectStart={onConnectStart}
                onConnectEnd={onConnectEnd}
                fitView
                fitViewOptions={{ padding: 2 }}
                nodeOrigin={[0.5, 0]}
                onInit={setReactFlowInstance}
                onDrop={onDrop}
                onDragOver={onDragOver}
            >
                <MiniMap />
                <Controls />
            </ReactFlow>
        </div>
    );
};

export default function DialogueController() {
    return (
        <div id="dialogue-flow">
            <ReactFlowProvider>
                <NodeSidebar />
                <FlowController />
            </ReactFlowProvider>
        </div>
    );
} 