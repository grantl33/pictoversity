import { useMainDispatchContext } from "../../MainContext";
import { useState, useEffect } from "react";
function WindowContext() {
  // Use dispatch context for updating the main state
  const dispatch = useMainDispatchContext();
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const standaloneCheck = window.navigator.standalone === true;
    setIsStandalone(standaloneCheck);
    if (standaloneCheck) {
      dispatch({
        type: "setAlertText",
        alertText: "Thanks for installing Pictoversity!"
      });
    } else {
      dispatch({
        type: "setModalContent",
        modalContent: {
          title: "Install Pictoversity",
          content: <>
            Pictoversity is designed for mobile devices.
            For the best experience, install it as an app
            by clicking <span className="icon box-arrow-up"></span> in the location bar and
            select<br />"Add to Home Screen <span className="icon plus-square"></span>".
          </>
        }
      });
    }
  }, [isStandalone, dispatch]);
}

export default WindowContext;