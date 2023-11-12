import "./alert.css";
import { useMainContext } from "../../MainContext";
import { useEffect } from "react";
import { useState } from "react";
import { useMainDispatchContext } from "../../MainContext";

function Alert() {
    // Use main context to read from state
    const mainContext = useMainContext();
    const { alertText } = mainContext;
    const [showAlert, setShowAlert] = useState(false);

    // Use dispatch context for updating the main state
    const dispatch = useMainDispatchContext();

    useEffect(() => {
        if (alertText !== null) {
            setShowAlert(true);
            // hide alert after a delay
            setTimeout(() => {
                setShowAlert(false);
                setTimeout(() => {
                    // clear text after a delay
                    dispatch({
                        type: "setAlertText",
                        alertText: null
                    });
                }, 200);
            }, 3000);
        }
    }, [alertText, dispatch]);
    return (
        <>
            {alertText !== null && <div className={`alert${(showAlert) ? " show" : ""}`}>
                <span>{alertText}</span>
            </div>}
        </>
    )
}

export default Alert;