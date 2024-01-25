import "./styles.css";
import trash from "../../assets/icons/trash3-fill.svg";
import badgeempty from "../../assets/icons/person-badge-empty.svg";
import { useMainContext, useMainDispatchContext } from '../../MainContext';
import { useEffect } from 'react';
import { isNullOrUndefined } from '../../utils';
import { loadNotificationsByMemberId, removeNotification } from "../../api";
import { Link, NavLink } from "react-router-dom";
function Notifications() {
    // Use dispatch context for updating the main state
    const dispatch = useMainDispatchContext();

    // Use main context to read from state
    const mainContext = useMainContext();
    const {
        creators,
        member,
        notifications
    } = mainContext;

    useEffect(() => {
        if (isNullOrUndefined(member)) return;
        loadNotificationsByMemberId(dispatch, member.Id);
    }, [dispatch, member]);

    const handleDeleteNotification = (notificationId) => {
        removeNotification(dispatch, member.Id, notificationId)
    }

    const getCreatorBadge = (creatorId) => {
        if (isNullOrUndefined(creators)) return null;
        const creatorData = creators.find((creator) => creator.Id === parseInt(creatorId));
        if (isNullOrUndefined(creatorData)) return null;
        const creatorStyle = (!isNullOrUndefined(creatorData)) ?
            {
                backgroundImage: `url('/images/profiles/${creatorData.USERNAME}.png')`
            }
            : null;
        return (
            <div className="creator-badge">
                <Link className="creator-image-container" to={`/creator?id=${creatorData.Id}`}>
                    <div className="creator-image" style={creatorStyle}></div>
                    <img src={badgeempty} alt="" className="badge" />
                </Link>
            </div>
        )
    }

    return (
        <div className="notifications">
            <div className="notifications-bar">
                <h3>Notifications ({!isNullOrUndefined(notifications) ? notifications.length : "0"})</h3>
            </div>
            <div className="notifications-list">
                <div className="notifications-container">
                    {notifications && notifications.map((notificationObj) =>
                        <div className="notifications-row" key={notificationObj.Id}>
                            <div className="notifications-source">{!isNullOrUndefined(notificationObj.CREATOR_ID) &&
                                getCreatorBadge(notificationObj.CREATOR_ID)
                            }</div>
                            <div className="notifications-content">
                                {(!isNullOrUndefined(notificationObj.COMIC_ID) &&
                                    <NavLink to={`/details?id=${notificationObj.COMIC_ID}`}>
                                        {notificationObj.MESSAGE_TEXT}
                                    </NavLink>
                                )}
                                {(isNullOrUndefined(notificationObj.COMIC_ID)) &&
                                    <>{notificationObj.MESSAGE_TEXT}</>
                                }
                            </div>
                            <div className="notifications-actions"><img src={trash} alt="Delete" onClick={(e) => {
                                handleDeleteNotification(notificationObj.Id);
                            }} /></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Notifications;