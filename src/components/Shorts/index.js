import "./styles.css";
import shorts_01 from "../../assets/shorts/shorts_01.png";
import shorts_02 from "../../assets/shorts/shorts_02.png";
import shorts_03 from "../../assets/shorts/shorts_03.png";
import shorts_04 from "../../assets/shorts/shorts_04.png";
import shorts_05 from "../../assets/shorts/shorts_05.png";

function Shorts() {
    const shorts = [
        {
            src: shorts_01,
            title: "Short #1",
            author: "Yumie Lee"
        },
        {
            src: shorts_02,
            title: "Short #2",
            author: "Yumie Lee"
        },
        {
            src: shorts_03,
            title: "Short #3",
            author: "Yumie Lee"
        },
        {
            src: shorts_04,
            title: "Short #4",
            author: "Yumie Lee"
        },
        {
            src: shorts_05,
            title: "Short #5",
            author: "Yumie Lee"
        },
    ]
    return (
        <div className="shorts">
            <div className="shorts-content">

                <div className="shorts-module">
                    {shorts && shorts.map((s, idx) =>
                        <div className="shorts-module-item"
                            key={idx}>
                            <div className="shorts-module-text">{s.title} by {s.author}</div>
                            <div>
                                <img
                                    className={`shorts-module-content`}
                                    src={s.src}
                                    alt="" />
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div >
    )
}

export default Shorts;