import React, {useState} from 'react';
import { Handle, Position } from 'reactflow';
import Choice from './Choice.jsx';

export default function ChoiceNode() {
    const [choices, setChoices] = useState([]);

    function addChoice(choice) {
        setChoices((prevChoices) => {
            return [...prevChoices, choice]
        })
    }

    function updateChoice(position, updatedChoice) {
        console.log("update");
        setChoices((prevChoices) => {
            const newArray = prevChoices.map((choice, index) => {
                if (index === position) {
                    return updatedChoice;
                }
                return choice;
            })
            return [...newArray];
        })
    }

    function removeChoice(position) {
        console.log("remove " + position);
        console.log(choices);
        setChoices((prevChoices) => {
            const filteredArray = prevChoices.filter((choice, index) => index !== position);
            return [...filteredArray];
        })
    }

    return (
        <>
            <Handle type="target" position={Position.Top} id="top" />
            <Handle type="target" position={Position.Left} id="left" />
            <div id="choice-node">
                {choices.map((choice, index) => {
                    return (
                        <Choice key={index} label={choice} position={index} onUpdate={updateChoice} onRemove={removeChoice} />
                    );
                })}
                <button onClick={() => addChoice("New")}>Add</button>
            </div>
            <Handle type="source" position={Position.Right} id="right" />
            <Handle type="source" position={Position.Bottom} id="bott" />
        </>
    );
}
