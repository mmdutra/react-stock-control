import React from 'react'
import { Modal } from './../../../components/modal'

export const CreateProductModal = ({ show, handleClose }) => {
    return (
        <Modal show={show} handleClose={handleClose}>
            <p>Modal</p>
            <p>Data</p>
        </Modal>
    );
}