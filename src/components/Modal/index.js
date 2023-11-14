import "./modal.css";
import { useMainContext } from "../../MainContext";
import { useMainDispatchContext } from "../../MainContext";
import { useEffect, useState } from "react";

function Modal() {
    // Use dispatch context for updating the main state
    const dispatch = useMainDispatchContext();

    // Use main context to read from state
    const mainContext = useMainContext();
    const { modalContent } = mainContext;
    const [show, setShow] = useState(false);
    const {
        title,
        content
    } = modalContent;
    const hasModalContent = (title !== null && content !== null);

    const handleDismiss = () => {
        setShow(false);
        setTimeout(() => {
            dispatch({
                type: "setModalContent",
                modalContent: {
                    title: null,
                    content: null
                }
            });
        }, 200)
    }
    useEffect(() => {
        setShow(hasModalContent);
    }, [hasModalContent])

    return (<>
        {hasModalContent && <div className={(show ? "modal show" : "modal")}>
            <div className="modal-container">
                <div className="modal-content">
                    <h2>{title}</h2>
                    <p>{content}</p>
                    <button onClick={handleDismiss}>Dismiss</button>
                </div>
            </div>
        </div>}
    </>)
}

export default Modal;