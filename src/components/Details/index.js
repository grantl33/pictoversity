import "./details.css";
import arrowleft from "../../assets/icons/arrow-left.svg";
import plus from "../../assets/icons/plus-circle.svg";
import bell from "../../assets/icons/bell-fill.svg";
import donate from "../../assets/icons/donate.svg";
import { Link, useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import ComicData from "../../comicData";
import CreatorData from "../../creatorData";

function Details() {
    const { search } = useLocation();
    const [comicData, setComicData] = useState();

    useMemo(() => {
        const query = new URLSearchParams(search);
        const comicId = query.get("id");
        if (comicId in ComicData) {
            setComicData(ComicData[comicId]);
        } else {
            setComicData(null);
        }
    }, [search]);

    const style = (comicData != null) ? {
        backgroundImage: `url('${comicData.coverImage}')`
    } : null;

    const creatorData = (comicData != null)
        ? CreatorData[comicData.creatorId]
        : null;

    const creatorStyle = (creatorData != null) ? {
        backgroundImage: `url('${creatorData.creatorImage}')`
    } : null;

    const episodes = (comicData != null)
        ? comicData.episodes
        : null;

    return (
        <div className="details">
            {(comicData == null) && <>Comic not found!</>}
            {(comicData != null) &&
                <>
                    <div className="details-header">
                        <div className="details-content">
                            <div className="details-topbar">
                                <div>
                                    <Link to="/">
                                        <img className="icon" src={arrowleft} alt="back" />
                                    </Link>
                                </div>
                                <div className="center">
                                    <h3>{comicData.title}</h3>
                                </div>
                                <div className="right">
                                    <div className="icon-button">
                                        <img className="icon" src={plus} alt="back" />
                                    </div>
                                </div>
                            </div>
                            <div className="details-info">
                                <div className="left">
                                    <div className='item-cover' style={style}>
                                        <div className="overlay"></div>
                                    </div>
                                </div>
                                <div className="right">
                                    <p>{comicData.summary}</p>
                                    <div className="info-actions">
                                        <div className="creator-image-container">
                                            <div className="creator-image" style={creatorStyle}></div>
                                        </div>
                                        <div className="creator-info">
                                            <Link to="/">{creatorData.name}</Link>
                                            <span>&lt;1K followers</span>
                                        </div>
                                        <div >
                                            <img src={donate} alt="Donate" className="icon" />
                                        </div>
                                        <div>
                                            <img src={bell} alt="Notification" className="icon" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="details-body">
                        <div className="episodes-container">
                            {episodes.map((episode) => {
                                const episodeStyle = {
                                    backgroundImage: `url('${episode.coverImage}')`
                                }
                                return (
                                    <div className="episode-row">
                                        <div className="episode-number">{episode.number}</div>
                                        <div>
                                            <div className="episode-image" style={episodeStyle}>
                                                <div className="overlay"></div>
                                            </div>
                                        </div>
                                        <div className="episode-title">{episode.title}</div>
                                    </div>)
                            })}

                        </div>
                    </div>
                    <div className="details-footer"></div>
                </>
            }
        </div>
    )
}


export default Details;