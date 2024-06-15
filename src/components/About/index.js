import "./styles.css";
import drawing from "../../assets/about/drawing.png"
import comics from "../../assets/about/comics.png"
import step1 from "../../assets/about/install_01.png"
import step2 from "../../assets/about/install_02.png"
import step3 from "../../assets/about/install_03.png"
import step4 from "../../assets/about/install_04.png"
import step1a from "../../assets/about/install_android_01.png"
import step2a from "../../assets/about/install_android_02.png"
import step3a from "../../assets/about/install_android_03.png"
import step4a from "../../assets/about/install_android_04.png"
import seesaw from "../../assets/about/seesaw.png"
import signup from "../../assets/about/signup.png"
import Header from "../Header";
import { ReactComponent as Instagram } from "../../assets/about/instagram.svg";
import { ReactComponent as Apple } from "../../assets/icons/apple.svg";
import { ReactComponent as Android } from "../../assets/icons/android.svg";
import { ReactComponent as Email } from "../../assets/about/envelope-fill.svg";
import Bio from "../Bio";
import { useState } from "react";
import { useMainDispatchContext } from "../../MainContext";

function About() {
    const dispatch = useMainDispatchContext();
    const [installMode, setInstallMode] = useState("apple");
    const blurBgStyle = {
        backgroundImage: "radial-gradient(rgba(150,157,227,.5) 15%, rgba(150,157,227,0.25) 45%, rgba(150,157,227,0.0) 65%)"
    }
    return (
        <>
            <Header />
            <div className="about">
                <div className="hero" >
                    <div className="hero-background">
                        <div className="hero-text content">
                            <h1>Make Learning Fun!</h1>
                            <h2>Digital comic fun combined with a visual learning experience</h2>
                            <div className="actions">
                                <div><button className="get-started" onClick={() => {
                                    // window.location.href = "#install";
                                    dispatch({
                                        type: "setAppMode",
                                        value: true
                                    });
                                }}>Open the App!
                                </button></div>
                                <div><button className="donate" onClick={() => {
                                    window.open("https://venmo.com/u/pictoversity");
                                }}>Donate Now!</button></div>
                            </div>
                            <h3>You can also install the webapp on your phone! Just read the instructions below!</h3>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="content">
                        <div className="section-row">
                            <div className="centered"><img src={drawing} alt="" className="medium-image" /></div>
                            <div>
                                <h2>Get learning entertainment through comics! We aim to&hellip;</h2>
                                <ul>
                                    <li>Foster critical thinking and visual/reading comprehension</li>
                                    <li>Comics perfect for kids ages 7-18</li>
                                    <li>Encourage children to stay curious and become active participants in their own education</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {installMode === "apple" &&
                    <>
                        <div id="install">
                            <div className="content">

                                <div className="section-row">
                                    <div className="install-text">
                                        <h2>How to download the Pictoversity webapp on iPhone:</h2>
                                        <ol>
                                            <li>Search up Pictoversity.org</li>
                                            <li>Click on the Share icon</li>
                                            <li>Scroll down and click on "Add To Home Screen"</li>
                                            <li>Click on "Add"</li>
                                        </ol>
                                        <div>
                                            <div className="install-mode" onClick={() => {
                                                setInstallMode("android")
                                            }}>
                                                <div>
                                                    <div><Android /></div>
                                                    <div>Install steps for Android device</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="centered">
                                        <img src={comics} alt="" className="medium-image" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="install content">
                                <div>
                                    <h2>1</h2>
                                    <img src={step1} alt="Step 1" className="install-image" />
                                </div>
                                <div>
                                    <h2>2</h2>
                                    <img src={step2} alt="Step 2" className="install-image" />
                                </div>
                                <div>
                                    <h2>3</h2>
                                    <img src={step3} alt="Step 3" className="install-image" />
                                </div>
                                <div>
                                    <h2>4</h2>
                                    <img src={step4} alt="Step 4" className="install-image" />
                                </div>
                            </div>
                        </div>
                    </>
                }
                {installMode === "android" &&
                    <>
                        <div id="install">
                            <div className="content">

                                <div className="section-row">
                                    <div className="install-text">
                                        <h2>How to download the Pictoversity webapp on Android:</h2>
                                        <ol>
                                            <li>Search up Pictoversity.org</li>
                                            <li>Click the "3-dots" icon</li>
                                            <li>Click the menu option "Install app"</li>
                                            <li>Click "Install"</li>
                                        </ol>
                                        <div>
                                            <div className="install-mode" onClick={() => {
                                                setInstallMode("apple")
                                            }}>
                                                <div>
                                                    <div><Apple /></div>
                                                    <div>Install steps for iPhone</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="centered">
                                        <img src={comics} alt="" className="medium-image" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="install content android">
                                <div>
                                    <h2>1</h2>
                                    <img src={step1a} alt="Step 1" className="install-image" />
                                </div>
                                <div>
                                    <h2>2</h2>
                                    <img src={step2a} alt="Step 2" className="install-image" />
                                </div>
                                <div>
                                    <h2>3</h2>
                                    <img src={step3a} alt="Step 3" className="install-image" />
                                </div>
                                <div>
                                    <h2>4</h2>
                                    <img src={step4a} alt="Step 4" className="install-image" />
                                </div>
                            </div>
                        </div>

                    </>
                }
                <div>
                    <div className="signup centered content">
                        <h2>Install the app and sign up to be a member of Pictoversity!</h2>
                        <img src={signup} alt="Sign up to be a member of Pictoversity!" className="wide-image" />
                    </div>
                </div>
                <div>
                    <div className="start-making content" style={blurBgStyle}>
                        <h2>Start making comics for Pictoversity!</h2>
                        <div>
                            <a href="https://docs.google.com/document/d/1SKzUUkZiivYfqEAPWkfPhBwFSjBD3VXbbfCrQ6eD1JU/edit?usp=sharing"
                                target="_blank" rel="noreferrer">Do you create awesome comics that you would like to share on the Pictoversity App?
                                Then you should become a Pictoversity Creator!</a>
                        </div>
                        <img src={seesaw} alt="Start making comics for Pictoversity!" className="wide-image" />
                    </div>
                </div>
                <Bio />
                <div className="footer-section">
                    <div className="footer-content content">
                        <div className="footer-row">
                            <div>
                                <h2>Donate</h2>
                                <h3>Pictoversity is a 501(c)(3) non-profit organization. Your tax-deductible donations will help us run this platform made
                                    to help children find the best edutainment. We appreciate all the help we can get :)
                                </h3>
                            </div>
                            <div>
                                <button className="donate" onClick={() => {
                                    window.open("https://venmo.com/u/pictoversity")
                                }}>Donate Now</button>
                            </div>
                        </div>
                        <div className="footer-row">
                            <div>
                                <div className="contacts">
                                    <Email />
                                    <a href="mailto:pictoversity@gmail.com">pictoversity@gmail.com</a>
                                </div>
                            </div>
                            <div className="socials">
                                <div className="contacts">
                                    <Instagram />
                                    <a href="https://www.instagram.com/pictoversity" title="" target="_blank" rel="noreferrer">@pictoversity</a>
                                </div>
                            </div>
                        </div>
                        <div className="footer-row">
                            <div>
                                &copy; 2024 Yumie Lee
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About;