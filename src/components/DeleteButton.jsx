import React, { useRef } from 'react';
import { ConfirmationModal } from './ConfirmationModal.jsx';

export default function DeleteButton({onConfirm}) {
    const confirmDialog = useRef();

    function handleConfirm() {
        confirmDialog.current.open();
    }

    return (<>
        <ConfirmationModal choice={"delete"} onConfirm={onConfirm} ref={confirmDialog} />
        <button onClick={handleConfirm}>-</button>
    </>);
}
