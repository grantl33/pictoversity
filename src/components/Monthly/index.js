import "./styles.css";
import monthly_01 from "../../assets/monthly/09_2025_01.png";
import monthly_02 from "../../assets/monthly/09_2025_02.png";
import banner from "../../assets/monthly/09_2025_banner.png";


function Monthly() {
    const monthly = [
        {
            src: monthly_01,
            title: "Comic #1",
            author: "Sarah Tenn"
        },
        {
            src: monthly_02,
            title: "Comic #2",
            author: "Yumie Lee"
        },
    ]
    return (
        <div className="monthly">
            <div className="monthly-banner" >
                <div className="monthly-banner-image" style={{
                    backgroundImage: `url('${banner}')`
                }}>
                </div>
            </div>
            <div className="monthly-content" >
                <div className="monthly-content-items">
                    {monthly && monthly.map((s, idx) =>
                        <div key={idx}
                            className="monthly-content-item"
                        >
                            <div>{s.title} by {s.author}</div>
                            <div>
                                <img src={s.src}
                                    alt="" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div >
    )
}

export default Monthly;