import Cover from "../Cover";

import { ReactComponent as ArrowLeft } from "../../assets/icons/arrow-left-circle-fill.svg";
import { ReactComponent as ArrowRight } from "../../assets/icons/arrow-right-circle-fill.svg";
import { useRef } from "react";

function CoverRow(props) {
    const {
        comicsData,
        showRanking,
    } = props;

    const rowRef = useRef(null);
    function handleScroll(direction) {
        rowRef.current.scrollBy(
            {
                top: 100,
                left: rowRef.current.getBoundingClientRect().width * direction,
                behavior: "smooth",
            });
    }

    return (
        <>
            <div className="items-row-buttons">
                <div className="items-row-button left" onClick={() => {
                    handleScroll(-1)
                }}><ArrowLeft /></div>
                <div className="items-row-button right" onClick={() => {
                    handleScroll(1)
                }}><ArrowRight /></div>
            </div>
            <div className="items-container" ref={rowRef}>
                <div className="items-row">
                    {comicsData &&
                        comicsData.map((comic, idx) =>
                            <Cover key={`${comic.id}-${idx}`}
                                comicData={comic}
                                ranking={showRanking ? idx + 1 : null}
                            />)
                    }
                </div>
            </div>
        </>
    )
}

export default CoverRow;