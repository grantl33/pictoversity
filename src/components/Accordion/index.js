import "./accordion.css";
import badge from "../../assets/icons/person-badge.svg";
import chevronup from "../../assets/icons/chevron-up.svg";
import chevrondown from "../../assets/icons/chevron-down.svg";
import { useRef, useState } from "react";


function Accordion(props) {
    const { title, children } = props;
    const contentRef = useRef();
    const [opened, setOpened] = useState(false);
    const [height, setHeight] = useState(null);

    const handleClick = () => {
        setOpened(!opened);
    }
    if (height === null && contentRef.current !== undefined) {
        // capture the initial height by temp making the content visible
        const el = contentRef.current;
        el.style.height = "auto";
        setHeight(el.getBoundingClientRect().height);
        el.style.height = "0px";
    }

    const style = (opened)
        ? {
            height: `${height}px`,
            opacity: "1.0"
        }
        : {
            height: "0px",
            opacity: "0.0"
        };

    return (
        <>
            <div className="accordion-item">
                <div className="accordion-title" onClick={handleClick}>
                    <img src={badge} className="icon" alt="" />
                    <span>{title}</span>
                    <img src={(opened) ? chevrondown : chevronup} alt="Show/Hide" />
                </div>
            </div>
            <div className="accordion-content" ref={contentRef} style={style}>
                <p>{children}</p>
            </div>
        </>
    )

}
export default Accordion;