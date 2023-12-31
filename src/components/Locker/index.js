import "./locker.css";
import locker from "../../assets/icons/locker.svg";
import badgeempty from "../../assets/icons/person-badge-empty.svg";
import { useMainContext, useMainDispatchContext } from "../../MainContext";
import remove from "../../assets/icons/dash-circle.svg";
import { useState } from "react";
import ComicData from "../../comicData";
import CreatorData from "../../creatorData";
import Cover from "../Cover";
import { Link } from "react-router-dom";

function Locker() {
    // Use main context to read from state
    const mainContext = useMainContext();
    const {
        followingCreators,
        lockerItems
    } = mainContext;
    const lockerItemArray = lockerItems.map((itemId) => ComicData[itemId]);
    const followingCreatorsArray = followingCreators.map((creatorId) => CreatorData[creatorId]);

    // Use dispatch context for updating the main state
    const dispatch = useMainDispatchContext();

    const [selectedTab, setSelectedTab] = useState("mycomics");

    const getLockerItems = () => {
        return (
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
        );
    }
    const getFollowingCreators = () => {
        return (
            <div className="locker-container">
                {followingCreatorsArray.length === 0 &&
                    <div className="empty-message">
                        <span>Nothing yet, follow some creators!</span>
                    </div>
                }
                {followingCreatorsArray.length > 0 && followingCreatorsArray.map((item) =>
                    <div className="locker-item-row" key={item.id}>
                        <div className="locker-item-info">
                            <Link className="creator-image-container" to={`/creator?id=${item.id}`}>
                                <div className="creator-image" style={{
                                    backgroundImage: `url('${item.creatorImage}')`
                                }}></div>
                                <img src={badgeempty} alt="" className="badge" />
                            </Link>
                            <div>
                                <Link className="creator-name" to={`/creator?id=${item.id}`}>
                                    {item.name}
                                </Link>
                            </div>

                        </div>
                        <div className="locker-item-remove" onClick={() => {
                            dispatch({
                                type: "removeFollowCreator",
                                creatorId: item.id,
                                alertText: `Unfollowed ${item.name}`
                            });
                        }}>
                            <img src={remove} alt="Remove" className="icon" />
                        </div>
                    </div>
                )
                }
            </div >
        );
    }

    return (
        <div className="locker">
            <div className="locker-header">
                <div className="locker-content">
                    <div className="locker-top-banner">
                        <h2><img src={locker} alt="Locker" className="icon" />My Locker</h2>
                    </div>
                </div>
                <nav>
                    <div className={(selectedTab === "mycomics") ? "nav-tab selected" : "nav-tab"}
                        onClick={() => { setSelectedTab("mycomics") }}>
                        <span>My Comics{lockerItemArray.length > 0 &&
                            <> ({lockerItemArray.length})</>
                        }</span>
                    </div>
                    <div className={(selectedTab === "following") ? "nav-tab selected" : "nav-tab"}
                        onClick={() => { setSelectedTab("following") }}>
                        <span>Following{followingCreatorsArray.length > 0 &&
                            <> ({followingCreatorsArray.length})</>
                        }</span>
                    </div>
                </nav>
                <div className="shadow-container">
                    <div className="shadow"></div>
                </div>
            </div>
            <div className="locker-body">
                <div className="locker-container">
                    {(selectedTab === "mycomics") && getLockerItems()}
                    {(selectedTab === "following") && getFollowingCreators()}
                </div>
            </div>
        </div>)
}

export default Locker;