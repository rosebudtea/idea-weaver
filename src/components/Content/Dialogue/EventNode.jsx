import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';

export default function EventNode() {
    const [selected, setSelected] = useState("Add");
    const [updateSelected, setUpdateSelected] = useState("Hint");
    const [vari, setVari] = useState("");
    const [variSet, setVariSet] = useState("");
    const [variNum, setVariNum] = useState(1);

    function changeEvent(e) {
        setSelected(e.target.value);
    }

    function changeUpdatedEvent(e) {
        setUpdateSelected(e.target.value);
    }

    function changeNumValue(e) {
        if (e.target.value <= 1) {
            setVariNum(1);
        } else {
            setVariNum(e.target.value);
        }
    }

    return (
        <>
            <Handle type="target" position={Position.Top} id="top" />
            <Handle type="target" position={Position.Left} id="left" />
            <div id="event-node">
                <select value={selected} onChange={changeEvent}>
                    <option name="add">Add</option>
                    <option name="remove">Remove</option>
                    <option name="update">Update</option>
                    <option name="change">Change</option>
                </select>
                {(selected === "Add" || selected === "Remove") && <>
                    <input type='text' value={vari} onChange={(e) => setVari(e.target.value)} />
                    <input type='number' value={variNum} onChange={changeNumValue} style={{width: "2rem"}} />
                </>}
                {selected === "Update" && <>
                    <select value={updateSelected} onChange={changeUpdatedEvent}>
                        <option name="hint">Hint</option>
                        <option name="objective">Objective</option>
                        <option name="journal">Journal</option>
                        <option name="variable">Variable</option>
                    </select>
                </>}
                {selected === "Change" && <>
                    <input type='text' value={vari} onChange={(e) => setVari(e.target.value)} />
                    <p>To</p>
                    <input type='text' value={variSet} onChange={(e) => setVariSet(e.target.value)} />
                </>}
            </div>
            <Handle type="source" position={Position.Right} id="right" />
            <Handle type="source" position={Position.Bottom} id="bott" />
        </>
    );
}
