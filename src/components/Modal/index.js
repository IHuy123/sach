import React from "react";
import ReactDOM from "react-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { CLOSE_MODAL } from "../../store/modal/actions";
import store from './../../store/index';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 13;
  width: 100%;
  height: ${(props) => (props.isOpen ? "100vh" : "0px")};
  display: block;
  transition: all 0.3s;
  overflow: hidden;
`;

const Modal = styled.div`
  width: 90%;
  max-width: 600px;
  height: max-content;
  border-radius: 10px;
  background: #f8f9fa;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 9;
  transform: translate(-50%, -50%);
`;
export const ModalContent = styled.div``;

const ModalShadow = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: black;
  opacity: 0.7;
  backdrop-filter: blur(2px);
`;

export function ModalContainer() {
  const { isOpen, content } = useSelector((state) => state.Modal);
  const dispatch = useDispatch();
  function close() {
    dispatch({
      type: CLOSE_MODAL,
    });
  }

  return ReactDOM.render(
    <Provider store={store}>
      <Container isOpen={isOpen}>
        <ModalShadow onClick={close} />
        <Modal>
          <ModalContent>{content}</ModalContent>
        </Modal>
      </Container>
    </Provider>,
    document.getElementById("root_modal")
  );
}
