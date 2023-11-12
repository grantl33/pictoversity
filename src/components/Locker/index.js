import "./locker.css";
import locker from "../../assets/icons/locker.svg";
import { useMainContext, useMainDispatchContext } from "../../MainContext";
import remove from "../../assets/icons/dash-circle.svg";
import { useState } from "react";
import ComicData from "../../comicData";
import Cover from "../Cover";
import { Link } from "react-router-dom";

function Locker() {
    // Use main context to read from state
    const mainContext = useMainContext();
    const { lockerItems } = mainContext;
    const lockerItemArray = lockerItems.map((itemId) => ComicData[itemId])

    // Use dispatch context for updating the main state
    const dispatch = useMainDispatchContext();

    const [selectedTab, setSelectedTab] = useState("mycomics");

    return (
        <div className="locker">
            <>
                <div className="locker-header">
                    <div className="locker-content">
                        <div className="locker-top-banner">
                            <h2><img src={locker} alt="Locker" /> My Locker</h2>
                        </div>
                    </div>
                    <nav>
                        <div className={(selectedTab === "mycomics") ? "nav-tab selected" : "nav-tab"}
                            onClick={() => { setSelectedTab("mycomics") }}>
                            <span>My Comics</span>
                        </div>
                        <div className={(selectedTab === "following") ? "nav-tab selected" : "nav-tab"}
                            onClick={() => { setSelectedTab("following") }}>
                            <span>Following</span>
                        </div>
                    </nav>
                </div>
                <div className="locker-body">
                    <div className="locker-container">
                        {lockerItemArray.length === 0 &&
                            <div className="empty-message">
                                <span>Nothing yet, add comics to your locker!</span>
                            </div>
                        }
                        {lockerItemArray.length > 0 && lockerItemArray.map((item) =>
                            <div className="locker-item-row" key={item.id}>
                                <div className="locker-item-info">
                                    <Cover comicData={item} showTitle={false} />
                                    <Link to={`/details?id=${item.id}`} >
                                        <strong>{item.title}</strong>
                                        <p>{item.summary}</p>
                                    </Link>
                                </div>
                                <div className="locker-item-remove" onClick={() => {
                                    dispatch({
                                        type: "removeLockerItem",
                                        comicId: item.id,
                                        alertText: "Removed from locker."
                                    });
                                }}>
                                    <img src={remove} alt="Remove" className="icon" />
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </>
        </div>)
}

export default Locker;