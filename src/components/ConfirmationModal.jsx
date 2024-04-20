import React, { forwardRef, useRef, useImperativeHandle } from 'react';

export const ConfirmationModal = forwardRef(function ChoiceConfirmationModal({choice, onConfirm}, ref) {
    const dialog = useRef();

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            },
        };
    });

    function close() {
        dialog.current.close();
    }

    return (
        <dialog id="modal" ref={dialog}>
            <h3>Please Confirm</h3>
            <p>Are you sure you want to {choice}?</p>
            <p>(This action cannot be undone)</p>
            <div>
                <button onClick={onConfirm}>Confirm</button>
                <button onClick={close}>Cancel</button>
            </div>
        </dialog>
    );
});
