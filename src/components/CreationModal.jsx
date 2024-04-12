import React, { forwardRef, useRef, useImperativeHandle } from 'react';

export const CreationModal = forwardRef(function ContentCreationModal({createFn, category}, ref) {
    const dialog = useRef();
    const nameInput = useRef();

    useImperativeHandle(ref, () => {
        return {
            open() {
                nameInput.current.value = "";
                dialog.current.showModal();
            },
        };
    });

    function close() {
        dialog.current.close();
    }

    function create() {
        if (category !== "elements") {
            createFn(nameInput.current.value, category);
        } else {
            createFn(nameInput.current.value);
        }
        close();
    }


    return (
        <dialog id="modal" ref={dialog}>
            <h2>Create</h2>
            <div id="name-input">
                <p>Name:</p>
                <input ref={nameInput} type="text" />
            </div>
            <div id="modal-buttons">
                <button onClick={create}>Create</button>
                <button onClick={close}>Exit</button>
            </div>
        </dialog>
    );
});