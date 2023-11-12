import bell from '../../assets/icons/bell-fill.svg'
import search from '../../assets/icons/search.svg'
import home from '../../assets/icons/house-fill.svg'
import locker from '../../assets/icons/locker.svg'
import idcard from '../../assets/icons/person-vcard.svg'
import { useState } from 'react'
import Home from '../Home'
import Locker from '../Locker'
import IdCard from '../IdCard'

function Main() {
    const [selectedTab, setSelectedTab] = useState("home");

    return (
        <>
            <header>
                <div className="row">
                    <div className="header-left">
                        <span>Pictoversity</span>
                    </div>
                    <div className="header-right">
                        <div className="header-actions">
                            <img className="icon" src={bell} alt="" />
                            <img className="icon" src={search} alt="" />
                        </div>
                    </div>
                </div>
            </header >
            <main>
                {selectedTab === "home" && <Home />}
                {selectedTab === "locker" && <Locker />}
                {selectedTab === "idcard" && <IdCard />}
            </main >
            <footer>
                <nav className="row">
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
                </nav>
            </footer>
        </>
    )
}

export default Main;