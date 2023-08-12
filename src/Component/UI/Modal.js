import { Fragment } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onClickHideCart} />;
};
const ModalOverlay = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  const portalElement = document.getElementById("overlay");
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClickHideCart={props.onClickHide} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};
export default Modal;
