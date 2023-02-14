import React from "react";
import { Modal, IconButton } from "@fluentui/react";

const LoginModal = ({ isOpen, onDismiss }) => {
  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss} isBlocking={false}>
      <div>
        <h2>Login modal</h2>
        <IconButton
          iconProps={{ iconName: "ChromeClose" }}
          onClick={() => onDismiss()}
        />
      </div>
      <div>
        <p>this is a login modal</p>
      </div>
    </Modal>
  );
};

export default LoginModal;
