import { useMainDispatchContext } from "../../MainContext";
import pictoversity from "../../assets/pictoversity.png";
import "./styles.css";

function Header() {
    const dispatch = useMainDispatchContext();

    return (
        <header className="full">
            <div className="row">
                <div><img src={pictoversity} alt="Logo" height={24} className="logo full" /></div>
                <div className="header-left">
                    <span></span>
                </div>
                <div className="header-right">
                    <button className="open-app" onClick={() => {
                        dispatch({
                            type: "setAppMode",
                            value: true
                        });
                    }}>Open app!</button>
                </div>
                <div></div>
            </div>
        </header>)
}

export default Header;