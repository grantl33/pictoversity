import "./idcard.css";

import studentcard from "../../assets/icons/student_card.svg";
import { useMainContext } from "../../MainContext";
import { useMainDispatchContext } from "../../MainContext";
import Accordion from "../Accordion";

function IdCard() {

    // Use main context to read from state
    const mainContext = useMainContext();
    const { currentUser } = mainContext;

    // Use dispatch context for updating the main state
    const dispatch = useMainDispatchContext();

    return (
        <div className="idcard">
            <div className="idcard-header">
                <div className="idcard-content">
                    <div className="idcard-top-banner">
                        <h2>My ID</h2>
                        <img src={studentcard} alt="ID Card" className="icon" />
                        <input value={currentUser.username} onChange={(e) =>
                            dispatch({
                                type: "setCurrentUsername",
                                username: e.target.value
                            })
                        } />
                    </div>
                </div>
                <div className="shadow-container">
                    <div className="shadow"></div>
                </div>
            </div>
            <div className="idcard-body">
                <div className="idcard-container">
                    <div className="accordion">
                        <Accordion title="How to become a content creator">
                            Do you create awesome comics that you would like to share on the Pictoversity App?
                            Then you should become a Pictoversity Creator!<br />
                            <a href="https://docs.google.com/document/d/1SKzUUkZiivYfqEAPWkfPhBwFSjBD3VXbbfCrQ6eD1JU/edit?usp=sharing"
                                target="_blank" rel="noreferrer">Click here for more info</a>.
                        </Accordion>
                        <Accordion title="Become a volunteer">
                            Would you like to help Pictoversity? We need volunteers to help with formatting comics,
                            reviewing comic submissions, and more!<br />
                            <a href="https://docs.google.com/document/d/1aBuvnGd_gk4VwpAdmPFbhGFJEIlKOw11Li60ZvtWLvk/edit?usp=sharing"
                                target="_blank" rel="noreferrer">Click here for more info</a>.
                        </Accordion>
                        <Accordion title="Make a donation!">
                            You can make a donation <a href="https://www.paypal.com/donate/?business=PDMTEA6K5786Y&no_recurring=0&item_name=Thanks+for+supporting+Pictoversity%21+We+appreciate+you%21&currency_code=USD"
                                target="_blank" rel="noreferrer">here</a>!
                            All donations go towards keeping Pictoversity running. We are constantly developing and improving the platform
                            as well as adding new creators and comics. Your generous donations will help make all of this possible!
                            We appreciate you! :)
                        </Accordion>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IdCard;