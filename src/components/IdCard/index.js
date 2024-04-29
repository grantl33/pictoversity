import "./idcard.css";

import studentcard from "../../assets/icons/student_card.svg";
import { ReactComponent as MemberCrown } from "../../assets/crown-filled.svg";
import { ReactComponent as Guest } from "../../assets/person.svg";

import { useMainContext } from "../../MainContext";
import { useMainDispatchContext } from "../../MainContext";
import Accordion from "../Accordion";
import { getMembershipExpiration, isBlank, isNullOrUndefined, isValidFullMember, isValidInt } from "../../utils";
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

    const [tabMode, setTabMode] = useState("register");
    const [memberName, setMemberName] = useState("");
    const [memberEmail, setMemberEmail] = useState("");
    const [memberLockerCombo, setMemberLockerCombo] = useState("");
    const [memberLockerComboP1, setMemberLockerComboP1] = useState(0);
    const [memberLockerComboP2, setMemberLockerComboP2] = useState(0);
    const [memberLockerComboP3, setMemberLockerComboP3] = useState(0);
    const [agreeToTerms, setAgreeToTerms] = useState(false);
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
            errorMsgs.email = "Valid user name is required.";
            validCheck = false;
        }
        if (isBlank(memberLockerComboP1) ||
            isBlank(memberLockerComboP2) ||
            isBlank(memberLockerComboP3)) {
            errorMsgs.lockerCombo = "3-digit locker combo required.";
            validCheck = false;
        } else if (!isValidInt(memberLockerComboP1, 0, 36) ||
            !isValidInt(memberLockerComboP2, 0, 36) ||
            !isValidInt(memberLockerComboP3, 0, 36)) {
            errorMsgs.lockerCombo = "Combo numbers must be between 0 and 36.";
            validCheck = false;
        } else {
            setMemberLockerCombo(`${parseInt(memberLockerComboP1)}-${parseInt(memberLockerComboP2)}-${parseInt(memberLockerComboP3)}`);
        }
        if (!agreeToTerms && tabMode === "register") {
            errorMsgs.agreeToTerms = "You must read and agree.";
            validCheck = false;
        }
        setValidationErrors(errorMsgs);
        setIsValid(validCheck);
    }, [memberName, memberEmail, memberLockerComboP1, memberLockerComboP2, memberLockerComboP3, agreeToTerms, tabMode])

    const handleRegister = () => {
        createMember(dispatch, {
            NAME: memberName,
            EMAIL: memberEmail,
            LOCKER_COMBO: memberLockerCombo
        });
    }
    const handleLogin = () => {
        const loginObj = {
            email: memberEmail,
            combo: memberLockerCombo
        }
        loadMember(dispatch, loginObj);
        localStorage.setItem("memberLogin", JSON.stringify(loginObj));
    }

    const handleLogout = () => {
        localStorage.clear();
        window.location.replace("/");
    }

    const membershipExpiration = getMembershipExpiration(member);
    const isCrowned = isValidFullMember(member);

    return (
        <div className="idcard">
            <div className="idcard-header">
                <div className="idcard-content">
                    <div className="idcard-top-banner">
                        <h2>My ID</h2>
                        {!isNullOrUndefined(member) &&
                            <>
                                <div className="id-card-container">
                                    <img src={studentcard} alt="ID Card" className="icon" />
                                </div>

                                <h2>{member.NAME}</h2>
                                <h3>{member.EMAIL}</h3>
                                <div className="member-info">
                                    {isCrowned &&
                                        <>
                                            <div><MemberCrown className="crown full-member" /></div>
                                            <div>Full Member (expires: {getMembershipExpiration(member)})</div>
                                        </>
                                    }
                                    {!isCrowned &&
                                        <>
                                            <div><Guest className="guest" /></div>
                                            <div>Guest {!isNullOrUndefined(membershipExpiration) &&
                                                <>(expired on: {membershipExpiration})</>}
                                            </div>
                                        </>
                                    }
                                </div>
                                <div>
                                    <button onClick={handleLogout}>Log Out</button>
                                </div>
                            </>
                        }
                        {isNullOrUndefined(member) &&
                            <div className="field-section">
                                <div className="field-row">
                                    <label></label>
                                    <div>
                                        <div className="split-tab">
                                            <div className={`split-tab-choice${(tabMode === "register") ? " selected" : ""}`} onClick={() => {
                                                setTabMode("register");
                                            }}>Register</div>
                                            <div className={`split-tab-choice${(tabMode === "login") ? " selected" : ""}`} onClick={() => {
                                                setTabMode("login");
                                            }}>Login</div>

                                        </div>
                                    </div>
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
                                    <label>Username:</label>
                                    <input type="text" value={memberEmail} placeholder="Enter a unique username" maxLength={100} onChange={(e) => {
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
                                        }} onFocus={(e) => {
                                            e.target.select();
                                        }} />
                                        <input type="number" value={memberLockerComboP2} min="0" max="36" size="2" onChange={(e) => {
                                            setMemberLockerComboP2(e.target.value);
                                        }} onFocus={(e) => {
                                            e.target.select();
                                        }} />
                                        <input type="number" value={memberLockerComboP3} min="0" max="36" size="2" onChange={(e) => {
                                            setMemberLockerComboP3(e.target.value);
                                        }} onFocus={(e) => {
                                            e.target.select();
                                        }} />
                                    </div>

                                </div>
                                {!isNullOrUndefined(validationErrors.lockerCombo) &&
                                    <div className="field-row">
                                        <label></label>
                                        <span className="error-msg">{validationErrors.lockerCombo}</span>
                                    </div>
                                }

                                {(tabMode === "register") &&
                                    <>
                                        <div className="field-row">
                                            <label></label>
                                            <div className="checkbox-item">
                                                <input type="checkbox" value={agreeToTerms} onChange={(e) => {
                                                    setAgreeToTerms(!agreeToTerms);
                                                }} /><span> I have read and agree to <a
                                                    href="https://docs.google.com/document/d/1KYgh6setZ0u3kFHj7dvPb-54e7iWUmou84VDC7WjZ-Q/edit?usp=sharing" target="_blank" rel="noreferrer">Pictoversity's terms</a>.</span>
                                            </div>
                                        </div>
                                        {!isNullOrUndefined(validationErrors.agreeToTerms) &&
                                            <div className="field-row">
                                                <label></label>
                                                <span className="error-msg">{validationErrors.agreeToTerms}</span>
                                            </div>
                                        }
                                        <div className="field-row">
                                            <label>Payment:</label>
                                            <div>
                                                Please make your payment after registering: <a
                                                    href="https://docs.google.com/document/d/16j5ZTPOk-HNwr5AqAfoDpzUEK1Kc6SkcTkS4-kWHv4Q/edit?usp=sharing" target="_blank" rel="noreferrer">Payment instructions</a>
                                            </div>
                                        </div>
                                    </>
                                }

                                <div className="field-row">
                                    <label></label>
                                    <div>
                                        {(tabMode === "register") &&
                                            <button disabled={!isValid} onClick={handleRegister}>Register!</button>
                                        }
                                        {(tabMode === "login") &&
                                            <button disabled={!isValid} onClick={handleLogin}>Login!</button>
                                        }
                                    </div>
                                </div>

                                {(tabMode === "login") && <div className="field-row">
                                    <label></label>
                                    <span>Forgot locker combo? Please email <a href="mailto:pictoversity@gmail.com">pictoversity@gmail.com</a></span>
                                </div>}
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
                        <Accordion title="Help & Support">
                            If you have a question/concern, forgot your locker combo, or want to report a problem
                            please contact us via email at: <a href="mailto:pictoversity@gmail.com">pictoversity@gmail.com</a>.
                            We will do our best to help you!
                        </Accordion>
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
                            You can make a donation <a href="https://venmo.com/u/pictoversity"
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