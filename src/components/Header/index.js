import pictoversity from "../../assets/pictoversity.png";
function Header() {
    return (
        <header className="full">
            <div className="row">
                <div><img src={pictoversity} alt="Logo" height={32} className="logo full" /></div>
                <div className="header-left">
                    <span></span>
                </div>
                <div className="header-right">

                </div>
                <div></div>
            </div>
        </header>)
}

export default Header;