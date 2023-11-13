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
            </div>
            <div className="idcard-body">
                <div className="idcard-container">
                    <div className="accordion">
                        <Accordion title="How to become a content creator">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et elementum ex. Aliquam gravida cursus ante ac ultrices. Sed pulvinar dolor et dui hendrerit, vitae porttitor lorem facilisis. Quisque aliquet convallis hendrerit. Ut id laoreet velit, ac aliquet turpis. Aenean vel velit sem. Pellentesque iaculis varius purus a interdum. Sed nec tellus egestas, viverra nisi in, venenatis metus.
                        </Accordion>
                        <Accordion title="Become a volunteer">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et elementum ex. Aliquam gravida cursus ante ac ultrices. Sed pulvinar dolor et dui hendrerit, vitae porttitor lorem facilisis. Quisque aliquet convallis hendrerit. Ut id laoreet velit, ac aliquet turpis. Aenean vel velit sem. Pellentesque iaculis varius purus a interdum. Sed nec tellus egestas, viverra nisi in, venenatis metus.
                        </Accordion>
                        <Accordion title="Make a donation!">
                            You can make a donation <a href="https://google.com" target="_blank" rel="noreferrer">here</a>! Morbi et elementum ex. Aliquam gravida cursus ante ac ultrices. Sed pulvinar dolor et dui hendrerit, vitae porttitor lorem facilisis. Quisque aliquet convallis hendrerit. Ut id laoreet velit, ac aliquet turpis. Aenean vel velit sem. Pellentesque iaculis varius purus a interdum. Sed nec tellus egestas, viverra nisi in, venenatis metus.
                        </Accordion>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IdCard;