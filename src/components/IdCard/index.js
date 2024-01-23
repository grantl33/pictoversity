import "./idcard.css";

import studentcard from "../../assets/icons/student_card.svg";
import { useMainContext } from "../../MainContext";
import { useMainDispatchContext } from "../../MainContext";
import Accordion from "../Accordion";
import { isBlank, isNullOrUndefined } from "../../utils";
import { useEffect, useState } from "react";
import { createMember, loadMember } from "../../api";

function IdCard() {

    // Use main context to read from state
    const mainContext = useMainContext();
    const {
        member,
    } = mainContext;

    // Use dispatch context for updating the main state
    const dispatch = useMainDispatchContext();

    const [tabMode, setTabMode] = useState("login");
    const [memberName, setMemberName] = useState("");
    const [memberEmail, setMemberEmail] = useState("");
    const [memberLockerCombo, setMemberLockerCombo] = useState("");
    const [memberLockerComboP1, setMemberLockerComboP1] = useState(0);
    const [memberLockerComboP2, setMemberLockerComboP2] = useState(0);
    const [memberLockerComboP3, setMemberLockerComboP3] = useState(0);
    const [isValid, setIsValid] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        const errorMsgs = {};
        let validCheck = true;
        if (isBlank(memberName) && tabMode === "register") {
            errorMsgs.name = "Name is required.";
            validCheck = false;
        }
        if (isBlank(memberEmail)) {
            errorMsgs.email = "Valid email is required.";
            validCheck = false;
        }
        if (isBlank(memberLockerComboP1) ||
            isBlank(memberLockerComboP2) ||
            isBlank(memberLockerComboP3)) {
            errorMsgs.lockerCombo = "3-digit locker combo required.";
            validCheck = false;
        } else {
            setMemberLockerCombo(`${memberLockerComboP1}-${memberLockerComboP2}-${memberLockerComboP3}`);
        }
        setValidationErrors(errorMsgs);
        setIsValid(validCheck);
    }, [memberName, memberEmail, memberLockerComboP1, memberLockerComboP2, memberLockerComboP3, tabMode])

    const handleRegister = () => {
        createMember(dispatch, {
            NAME: memberName,
            EMAIL: memberEmail,
            LOCKER_COMBO: memberLockerCombo
        });
    }
    const handleLogin = () => {
        loadMember(dispatch, {
            email: memberEmail,
            combo: memberLockerCombo
        });
    }

    return (
        <div className="idcard">
            <div className="idcard-header">
                <div className="idcard-content">
                    <div className="idcard-top-banner">
                        <h2>My ID</h2>
                        {!isNullOrUndefined(member) &&
                            <>
                                <img src={studentcard} alt="ID Card" className="icon" />
                                <h2>{member.NAME}</h2>
                                <h3>{member.EMAIL}</h3>
                            </>
                        }
                        {isNullOrUndefined(member) &&
                            <div className="field-section">
                                <div className="split-tab">
                                    <div className={`split-tab-choice${(tabMode === "login") ? " selected" : ""}`} onClick={() => {
                                        setTabMode("login");
                                    }}>Login</div>
                                    <div className={`split-tab-choice${(tabMode === "register") ? " selected" : ""}`} onClick={() => {
                                        setTabMode("register");
                                    }}>Register</div>
                                </div>
                                {(tabMode === "register") &&
                                    <>
                                        <div className="field-row">
                                            <label>Name:</label>
                                            <input type="text" value={memberName} placeholder="Your Name" maxLength={100} onChange={(e) => {
                                                setMemberName(e.target.value);
                                            }} />
                                        </div>
                                        {!isNullOrUndefined(validationErrors.name) &&
                                            <div className="field-row">
                                                <label></label>
                                                <span className="error-msg">{validationErrors.name}</span>
                                            </div>

                                        }
                                    </>
                                }
                                <div className="field-row">
                                    <label>Email Address:</label>
                                    <input type="text" value={memberEmail} placeholder="your-email@domain.com" maxLength={100} onChange={(e) => {
                                        setMemberEmail(e.target.value);
                                    }} />
                                </div>
                                {!isNullOrUndefined(validationErrors.email) &&
                                    <div className="field-row">
                                        <label></label>
                                        <span className="error-msg">{validationErrors.email}</span>
                                    </div>
                                }
                                <div className="field-row">
                                    <label>Locker Combo:</label>
                                    <div className="locker-combo">
                                        <input type="number" value={memberLockerComboP1} min="0" max="36" size="2" onChange={(e) => {
                                            setMemberLockerComboP1(e.target.value);
                                        }} />
                                        <input type="number" value={memberLockerComboP2} min="0" max="36" size="2" onChange={(e) => {
                                            setMemberLockerComboP2(e.target.value);
                                        }} />
                                        <input type="number" value={memberLockerComboP3} min="0" max="36" size="2" onChange={(e) => {
                                            setMemberLockerComboP3(e.target.value);
                                        }} />
                                    </div>

                                </div>
                                {!isNullOrUndefined(validationErrors.name) &&
                                    <div className="field-row">
                                        <label></label>
                                        <span className="error-msg">{validationErrors.lockerCombo}</span>
                                    </div>
                                }
                                <div>
                                    {(tabMode === "register") &&
                                        <button disabled={!isValid} onClick={handleRegister}>Register!</button>
                                    }
                                    {(tabMode === "login") &&
                                        <button disabled={!isValid} onClick={handleLogin}>Login!</button>
                                    }
                                </div>

                            </div>
                        }

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