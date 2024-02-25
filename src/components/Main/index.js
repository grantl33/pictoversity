import pictoversity from "../../assets/pictoversity.png";
import bell from '../../assets/icons/bell-fill.svg'
import search from '../../assets/icons/search.svg'
import home from '../../assets/icons/house-fill.svg'
import locker from '../../assets/icons/locker.svg'
import idcard from '../../assets/icons/person-vcard.svg'
import { useEffect, useState } from 'react'
import Home from '../Home'
import Locker from '../Locker'
import IdCard from '../IdCard'
import { useMainContext, useMainDispatchContext } from '../../MainContext'
import Search from '../Search'
import Notifications from '../Notifcations'
import { isNullOrUndefined } from '../../utils'
import { loadNotificationsByMemberId } from '../../api'
import Bio from "../Bio";

function Main() {
    // Use dispatch context for updating the main state
    const dispatch = useMainDispatchContext();

    // Use main context to read from state
    const mainContext = useMainContext();
    const {
        notifications,
        member
    } = mainContext;
    const [selectedTab, setSelectedTab] = useState("home");

    useEffect(() => {
        if (isNullOrUndefined(member)) return;
        loadNotificationsByMemberId(dispatch, member.Id);
    }, [dispatch, member, selectedTab]);

    const handleLogoClick = () => {
        setSelectedTab("about");
        /**
        dispatch({
            type: "setModalContent",
            modalContent: {
                title: "About Pictoversity",
                content: <>
                    Pictoversity is an app and platform for educational comics.
                    It was designed and created by <a href="https://www.instagram.com/yumieleecomics/"
                        target="_blank" rel="noreferrer">Yumie Lee</a> and
                    the app was developed by <a href="https://github.com/grantl33"
                        target="_blank" rel="noreferrer">Grant Lee</a>.<br /><br />
                    &copy; Copyright 2023<br />Yumie and Grant Lee
                </>,
                showReload: true
            }
        });
        **/
    }
    return (
        <>
            <header>
                <div className="row">
                    <div></div>
                    <div className="header-left">
                        <img src={pictoversity} alt="Logo" height={32} className="logo" onClick={handleLogoClick} />
                    </div>
                    <div className="header-right">
                        <div className="header-actions">
                            <div className="notifications-bell">
                                <img className="icon" src={bell} alt="" onClick={(e) => setSelectedTab("notifications")} />
                                {(!isNullOrUndefined(notifications) && notifications.length > 0) &&
                                    <div className="notifications-indicator"></div>
                                }
                            </div>
                            <div>
                                <img className="icon" src={search} alt="" onClick={(e) => setSelectedTab("search")} />
                            </div>
                        </div>
                    </div>
                    <div></div>
                </div>
            </header>
            <main>
                {selectedTab === "home" && <Home />}
                {selectedTab === "locker" && <Locker />}
                {selectedTab === "idcard" && <IdCard />}
                {selectedTab === "search" && <Search />}
                {selectedTab === "notifications" && <Notifications />}
                {selectedTab === "about" &&
                    <div className="main-bio-container">
                        <div className="main-bio">
                            <Bio />
                        </div>
                    </div>}
            </main >
            <footer>
                <nav className="row">
                    <div></div>
                    <div className={(selectedTab === "home") ? "main-link selected" : "main-link"}
                        onClick={(e) => setSelectedTab("home")}>
                        <img src={home} alt="" />
                        <span>Home</span>
                    </div>
                    <div className={(selectedTab === "locker") ? "main-link selected" : "main-link"}
                        onClick={(e) => setSelectedTab("locker")}>
                        <img src={locker} alt="" />
                        <span>Locker</span>
                    </div>
                    <div className={(selectedTab === "idcard") ? "main-link selected" : "main-link"}
                        onClick={(e) => setSelectedTab("idcard")}>
                        <img src={idcard} alt="" />
                        <span>ID</span>
                    </div>
                    <div></div>
                </nav>
            </footer>
        </>
    )
}

export default Main;