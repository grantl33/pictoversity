import "./creator.css"
import close from "../../assets/icons/x-circle.svg";
import envelope from "../../assets/icons/envelope-fill.svg";
import donate from "../../assets/icons/donate.svg";
import badgeempty from "../../assets/icons/person-badge-empty.svg";
import { Link, useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import Cover from "../Cover";
import FollowingButton from "../FollowingButton";
import { useMainContext } from "../../MainContext";
import { isNullOrUndefined } from "../../utils";

function Creator() {
    const { search } = useLocation();
    const [creatorData, setCreatorData] = useState();

    // Use main context to read from state
    const mainContext = useMainContext();
    const {
        comics,
        creators
    } = mainContext;
    useMemo(() => {
        const query = new URLSearchParams(search);
        const creatorId = query.get("id");
        if (creators && creators.length > 0) {
            setCreatorData(creators.find(creator => creator.Id === parseInt(creatorId)));
        }
    }, [search, creators]);

    const creatorStyle = (!isNullOrUndefined(creatorData)) ?
        {
            backgroundImage: `url('/images/profiles/${creatorData.USERNAME}.png')`
        }
        : null;

    const seriesList = (!isNullOrUndefined(creatorData)) ?
        comics.filter((item) => item.CREATOR_ID === creatorData.Id)
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
                                <span>{nf.format(0)} followers</span>
                                <FollowingButton creatorData={creatorData} />
                            </div>
                            <div className="creator-actions">
                                <a href={creatorData.DONATE_LINK} className="creator-donate" target="_blank" rel="noreferrer">
                                    <img src={donate} alt="Donate" className="icon" />
                                    Donate
                                </a>
                                <a href={`mailto:${creatorData.email}`} className="creator-contact" target="_blank" rel="noreferrer">
                                    <img src={envelope} alt="Contact" className="icon" />
                                    Contact
                                </a>
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
                            <div className="shadow-container">
                                <div className="shadow"></div>
                            </div>
                            <div className="creator-series-container">
                                <div className="creator-series-list">
                                    {seriesList.map((item) => (
                                        <div key={item.Id} className="creator-series-row">
                                            <div>
                                                <Cover comicData={item} showTitle={false} />
                                            </div>
                                            <div>
                                                <h3>{item.TITLE}</h3>
                                                <p>
                                                    {item.SUMMARY}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </>}
        </div >
    )
}

export default Creator;