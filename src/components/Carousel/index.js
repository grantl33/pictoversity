import "./styles.css";

import BANNER1 from "../../assets/banners/banner_1.png";
import BANNER2 from "../../assets/banners/banner_2.png";
import BANNER3 from "../../assets/banners/banner_3.png";
import { ReactComponent as LeftArrow } from '../../assets/icons/arrow-left-circle-fill.svg';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const BANNERS = [
    {
        image: BANNER1,
        location: "/details?id=15"
    },
    {
        image: BANNER2,
        location: "/details?id=17"
    },
    {
        image: BANNER3,
        location: "/details?id=18"
    }
];

function Carousel() {
    const [currentPos, setCurrentPos] = useState(0);
    const navigate = useNavigate();


    function nextPos() {
        setCurrentPos(prev => {
            return prev === 2 ? 0 : prev + 1;
        })
    }
    function prevPos() {
        setCurrentPos(prev => {
            return prev === 0 ? 2 : prev - 1;
        })
    }

    function handleClick() {
        navigate(BANNERS[currentPos].location);
    }

    const bgImg = BANNERS[currentPos].image;
    const style = {
        backgroundImage: `url(${bgImg})`,
    }

    return (
        <div className="carousel">
            <div className="carousel-bg" style={style}></div>
            <div className="carousel-container">
                <div className={`carousel-items position-${currentPos}`} >
                    <div className="carousel-item">
                        <img src={BANNER1} alt="" />
                    </div>
                    <div className="carousel-item">
                        <img src={BANNER2} alt="" />
                    </div>
                    <div className="carousel-item">
                        <img src={BANNER3} alt="" />
                    </div>
                </div>
            </div>
            <div className="carousel-actions">
                <div className="left" onClick={prevPos}><LeftArrow /></div>
                <div className="center" onClick={handleClick}>
                    <div className="dots-container">
                        <div className="dots">
                            <div className={`${currentPos === 0 ? "selected" : ""}`} onClick={(e) => {
                                setCurrentPos(0);
                                e.stopPropagation();
                            }}></div>
                            <div className={`${currentPos === 1 ? "selected" : ""}`} onClick={(e) => {
                                setCurrentPos(1);
                                e.stopPropagation();
                            }}></div>
                            <div className={`${currentPos === 2 ? "selected" : ""}`} onClick={(e) => {
                                setCurrentPos(2);
                                e.stopPropagation();
                            }}></div>
                        </div>
                    </div>
                </div>
                <div className="right" onClick={nextPos}><LeftArrow /></div>
            </div>
        </div>
    )

}

export default Carousel;