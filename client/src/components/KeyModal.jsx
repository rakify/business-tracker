import { useState } from "react";
import styled from "styled-components";
import { updateKey } from "../redux/apiCalls";

const Modal = styled.div`
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
`;

const ModalHeader = styled.div`
  padding: 2px 16px;
  background-color: #5cb85c;
  color: white;
`;
const ModalBody = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: red;
  border-radius: 50%;
`;
const ModalFooter = styled.div`
  padding: 2px 16px;
  background-color: #5cb85c;
  color: white;
`;
const ModalContent = styled.div`
  position: relative;
  background-color: black;
  color: white;
  margin: auto;
  padding: 0;
  border: 1px solid #888;
  top: 40%;
  width: 50%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  animation-name: animatetop;
  animation-duration: 1s;
`;

const Close = styled.span`
  color: red;
  float: right;
  font-size: 22px;
  font-weight: bold;
  border-radius: 100%;
  background-color: white;
  cursor: pointer;
`;

const KeyModal = ({id}) => {
    const [prompt, setPrompt] = useState(true);
    const [confirm, setConfirm] = useState("Confirm"); // after confirming key show loading animation
    const [keyResponse, setKeyResponse] = useState("");
  
    const requestKey = () => {
        setConfirm(`Please Wait..`);
        updateKey(id).then((res) => setKeyResponse(res.request.responseText));
      };
    
  return (
    <div>
      {prompt && (
        <Modal>
          <ModalContent>
            {keyResponse === "" && (
              <>
                <ModalHeader>
                  <Close onClick={() => setPrompt(false)}>&times;</Close>
                  Are you sure you want to reset the admin key?
                </ModalHeader>
                <ModalBody onClick={requestKey}>{confirm}</ModalBody>
              </>
            )}
            {keyResponse !== "" && (
              <>
                <ModalHeader>
                  <Close onClick={() => setPrompt(false)}>&times;</Close>
                </ModalHeader>
                <ModalFooter>{keyResponse.slice(1, -1)}</ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default KeyModal;
