import pictoversity from "../../assets/pictoversity.png";

import { ReactComponent as HomeIcon } from "../../assets/icons/house-fill.svg";
import { ReactComponent as ShortsIcon } from "../../assets/icons/columns-gap.svg";
import { ReactComponent as MonthlyIcon } from "../../assets/icons/calendar-heart.svg";


import { useEffect, } from 'react'
import Home from '../Home'
import { useMainContext, useMainDispatchContext } from '../../MainContext'

import { isNullOrUndefined } from '../../utils'
import { loadNotificationsByMemberId } from '../../api'
import Shorts from "../Shorts";
import Publish from "../Publish";
import Monthly from "../Monthly";
import { useNavigate } from "react-router-dom";


function Main(props) {
    const navigate = useNavigate();
    // Use dispatch context for updating the main state
    const dispatch = useMainDispatchContext();
    const { selectedTab = "home" } = props;

    // Use main context to read from state
    const mainContext = useMainContext();
    const {
        member
    } = mainContext;

    useEffect(() => {
        if (isNullOrUndefined(member)) return;
        loadNotificationsByMemberId(dispatch, member.Id);
    }, [dispatch, member, selectedTab]);

    const handleLogoClick = () => {
        navigate("/", { replace: true })
    }
    return (
        <>
            <header>
                <div className="row">
                    <div></div>
                    <div className="header-left">
                        <img src={pictoversity} alt="Logo" height={24} className="logo" onClick={handleLogoClick} />
                    </div>
                    <div className="header-right">
                        <div className="header-actions">
                            <div className={`header-action${selectedTab === 'home' ? " selected" : ""}`} onClick={() => {
                                navigate("/", { replace: true })
                            }}>
                                <HomeIcon /></div>
                            <div className={`header-action${selectedTab === 'shorts' ? " selected" : ""}`} onClick={() => {
                                navigate("/shorts", { replace: true })
                            }}>
                                <ShortsIcon />
                            </div>
                            {/* <div className={`header-action${selectedTab === 'publish' ? " selected" : ""}`} onClick={() => {
                                navigate("/publish", { replace: true })
                            }}>
                                <PublishIcon />
                            </div> */}
                            <div className={`header-action${selectedTab === 'monthly' ? " selected" : ""}`} onClick={() => {
                                navigate("/monthly", { replace: true })
                            }}>
                                <MonthlyIcon />
                            </div>
                        </div>
                        <div className="header-menu">
                            <div className={`header-menu-item${selectedTab === 'home' ? " selected" : ""}`} onClick={() => {
                                navigate("/", { replace: true })
                            }}>
                                <div>Home</div>
                            </div>
                            <div className={`header-menu-item${selectedTab === 'shorts' ? " selected" : ""}`} onClick={() => {
                                navigate("/shorts", { replace: true })
                            }} >
                                <div>Shorts</div>
                            </div>
                            {/* <div className={`header-menu-item${selectedTab === 'publish' ? " selected" : ""}`} onClick={() => {
                                navigate("/publish", { replace: true })
                            }}>
                                <div>Publish</div>
                            </div> */}
                            <div className={`header-menu-item${selectedTab === 'monthly' ? " selected" : ""}`} onClick={() => {
                                navigate("/monthly", { replace: true })
                            }}>
                                <div>Monthly Theme</div>
                            </div>
                        </div>
                    </div>
                    <div></div>
                </div>
            </header >
            <main>
                {selectedTab === "home" && <Home />}
                {selectedTab === "shorts" && <Shorts />}
                {selectedTab === "publish" && <Publish />}
                {selectedTab === "monthly" && <Monthly />}
                {/*                 
                {selectedTab === "locker" && <Locker />}
                {selectedTab === "idcard" && <IdCard />}
                {selectedTab === "search" && <Search />}
                {selectedTab === "notifications" && <Notifications />}
                {selectedTab === "about" &&
                    <div className="main-bio-container">
                        <div className="main-bio">
                            <Bio />
                        </div> */}
                {/* </div>} */}
            </main >
            {/* <footer>
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
            </footer> */}
        </>
    )
}

export default Main;