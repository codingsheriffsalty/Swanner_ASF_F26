import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export default function ConfirmModal({ isOpen, title, message, confirmText = "Confirm", cancelText = "Go Back", onConfirm, onCancel, showCancel = true }) {
  return (
    <Modal isOpen={isOpen} toggle={onCancel} centered>
      <ModalHeader toggle={onCancel}>{title}</ModalHeader>
      <ModalBody>{message}</ModalBody>
      <ModalFooter>
        {showCancel && <Button color="secondary" onClick={onCancel}>{cancelText}</Button>}
        <Button color="primary" onClick={onConfirm}>{confirmText}</Button>
      </ModalFooter>
    </Modal>
  );
}
