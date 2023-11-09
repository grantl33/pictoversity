import "./creator.css"
import close from "../../assets/icons/x-circle.svg";
import envelope from "../../assets/icons/envelope-fill.svg";
import donate from "../../assets/icons/donate.svg";
import badgeempty from "../../assets/icons/person-badge-empty.svg";
import { Link, useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import ComicData from "../../comicData";
import CreatorData from "../../creatorData";
import Cover from "../Cover";

function Creator() {
    const { search } = useLocation();
    const [creatorData, setCreatorData] = useState();

    useMemo(() => {
        const query = new URLSearchParams(search);
        const creatorId = query.get("id");
        if (creatorId in CreatorData) {
            setCreatorData(CreatorData[creatorId]);
        } else {
            setCreatorData(null);
        }
    }, [search]);

    const creatorStyle = (creatorData != null) ?
        {
            backgroundImage: `url('${creatorData.creatorImage}')`
        }
        : null;

    const allComics = Object.keys(ComicData).map((key) => ComicData[key]);
    const seriesList = (creatorData != null) ?
        allComics.filter((item) => item.creatorId === creatorData.id)
        : null;

    const nf = new Intl.NumberFormat("en-US", {
        useGrouping: true,
        style: "decimal"
    });
    return (
        <div className="creator">
            {(creatorData == null) && <>Error: No creator found!</>}
            {(creatorData != null) &&
                <>
                    <div className="creator-header">
                        <div className="creator-title">
                            <div>Creator Info:</div>
                            <div className="right">
                                <Link to="/">
                                    <img className="icon" src={close} alt="back" />
                                </Link>
                            </div>
                        </div>
                        <div className="creator-info">
                            <div>
                                <div className="creator-image-container" >
                                    <div className="creator-image" style={creatorStyle}></div>
                                    <img src={badgeempty} alt="" className="badge" />
                                </div>
                            </div>
                            <div className="creator-name">
                                {creatorData.name}
                                <span>{nf.format(creatorData.followers)} followers</span>
                            </div>
                            <div className="creator-actions">
                                <div className="creator-donate">
                                    <img src={donate} alt="Donate" className="icon" />
                                    Donate
                                </div>
                                <div className="creator-contact">
                                    <img src={envelope} alt="Contact" className="icon" />
                                    Contact
                                </div>
                            </div>
                        </div>
                        <div className="summary">
                            <p>{creatorData.description}</p>
                        </div>
                    </div>
                    <div className="creator-body">
                        <div className="creator-series">
                            <div className="creator-series-header">
                                Series
                            </div>
                            <div className="creator-series-container">
                                <div className="creator-series-list">
                                    {seriesList.map((item) => (
                                        <div key={item.id} className="creator-series-row">
                                            <div>
                                                <Cover comicData={item} showTitle={false} />
                                            </div>
                                            <div>
                                                <h3>{item.title}</h3>
                                                <p>
                                                    {item.summary}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </>}
        </div>
    )
}

export default Creator;