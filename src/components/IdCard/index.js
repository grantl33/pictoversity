import "./idcard.css";

import studentcard from "../../assets/icons/student_card.svg";

function IdCard() {

    return (
        <div className="idcard">
            <div className="idcard-header">
                <div className="idcard-content">
                    <div className="idcard-topbar">
                        <img src={studentcard} alt="ID Card" />
                        <h2>ID Card</h2>
                    </div>
                </div>
            </div>
            <div className="idcard-body">
                Your ID Card
            </div>
        </div>
    )
}

export default IdCard;