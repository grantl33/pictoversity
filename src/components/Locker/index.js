import "./locker.css";
import locker from "../../assets/icons/locker.svg";
import badgeempty from "../../assets/icons/person-badge-empty.svg";
import { useMainContext, useMainDispatchContext } from "../../MainContext";
import remove from "../../assets/icons/dash-circle.svg";
import { useState } from "react";
import Cover from "../Cover";
import { Link } from "react-router-dom";
import { removeLockerItem, unfollowCreator } from "../../api";

function Locker() {
    // Use main context to read from state
    const mainContext = useMainContext();
    const {
        member,
        followingCreators,
        lockerItems,
        comics,
        creators
    } = mainContext;

    // Use dispatch context for updating the main state
    const dispatch = useMainDispatchContext();

    const [selectedTab, setSelectedTab] = useState("mycomics");

    const getLockerItems = () => {
        return (
            <div className="locker-container">
                {lockerItems.length === 0 &&
                    <div className="empty-message">
                        <span>Nothing yet, add comics to your locker!</span>
                    </div>
                }
                {lockerItems.length > 0 && lockerItems.map((lockerItem) => {
                    const item = comics.find((comic) => comic.Id === lockerItem.COMIC_ID);
                    return (
                        <div className="locker-item-row" key={item.Id}>
                            <div className="locker-item-info">
                                <Cover comicData={item} showTitle={false} />
                                <Link to={`/details?id=${item.Id}`} >
                                    <strong>{item.TITLE}</strong>
                                    <p>{item.SUMMARY}</p>
                                </Link>
                            </div>
                            <div className="locker-item-remove" onClick={() => {
                                const comicData = comics.find((comic) => comic.Id === lockerItem.COMIC_ID)
                                removeLockerItem(dispatch, lockerItem.Id, member.Id, comicData);
                            }}>
                                <img src={remove} alt="Remove" className="icon" />
                            </div>
                        </div>
                    )
                }
                )}
            </div>
        );
    }
    const getFollowingCreators = () => {
        return (
            <div className="locker-container">
                {followingCreators.length === 0 &&
                    <div className="empty-message">
                        <span>Nothing yet, follow some creators!</span>
                    </div>
                }
                {followingCreators.length > 0 && followingCreators.map((followingCreator) => {
                    const item = creators.find((creator) => followingCreator.CREATOR_ID === creator.Id);
                    return (
                        <div className="locker-item-row" key={item.id}>
                            <div className="locker-item-info">
                                <Link className="creator-image-container" to={`/creator?id=${item.Id}`}>
                                    <div className="creator-image" style={{
                                        backgroundImage: `url('/images/profiles/${item.USERNAME}.png')`
                                    }}></div>
                                    <img src={badgeempty} alt="" className="badge" />
                                </Link>
                                <div>
                                    <Link className="creator-name" to={`/creator?id=${item.Id}`}>
                                        {item.USERNAME}
                                    </Link>
                                </div>

                            </div>
                            <div className="locker-item-remove" onClick={() => {
                                const creatorData = creators.find((creator) => creator.Id === followingCreator.CREATOR_ID)
                                unfollowCreator(dispatch, followingCreator.Id, member.Id, creatorData);
                            }}>
                                <img src={remove} alt="Remove" className="icon" />
                            </div>
                        </div>
                    )
                }
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
                        <span>My Comics{lockerItems.length > 0 &&
                            <> ({lockerItems.length})</>
                        }</span>
                    </div>
                    <div className={(selectedTab === "following") ? "nav-tab selected" : "nav-tab"}
                        onClick={() => { setSelectedTab("following") }}>
                        <span>Following{followingCreators.length > 0 &&
                            <> ({followingCreators.length})</>
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