import "./details.css";
import arrowleft from "../../assets/icons/arrow-left.svg";
import plus from "../../assets/icons/plus-circle.svg";
import remove from "../../assets/icons/dash-circle.svg";
import donate from "../../assets/icons/donate.svg";
import badgeempty from "../../assets/icons/person-badge-empty.svg";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import ComicData from "../../comicData";
import CreatorData from "../../creatorData";
import { useMainContext, useMainDispatchContext } from "../../MainContext";
import FollowingButton from "../FollowingButton";

function Details() {
    const { search } = useLocation();
    const [comicData, setComicData] = useState();
    // Use main context to read from state
    const mainContext = useMainContext();
    const { lockerItems } = mainContext;

    // Use dispatch context for updating the main state
    const dispatch = useMainDispatchContext();

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

    const nf = new Intl.NumberFormat("en-US", {
        useGrouping: true,
        style: "decimal"
    });
    const isComicAdded = (comicData != null)
        ? lockerItems.indexOf(comicData.id) > -1
        : null;

    const handleAddLockerItem = () => {
        dispatch({
            type: "addLockerItem",
            comicId: comicData.id,
            alertText: "Added to locker!"
        });
    }

    const handleRemoveLockerItem = () => {
        dispatch({
            type: "removeLockerItem",
            comicId: comicData.id,
            alertText: "Removed from locker."
        });
    }

    return (
        <div className="details">
            {(comicData == null) && <>Error: Comic not found!</>}
            {(comicData != null) &&
                <>
                    <div className="details-header">
                        <div className="details-content">
                            <div className="details-topbar">
                                <div>
                                    <Link to="/">
                                        <img className="icon" src={arrowleft} alt="Back" />
                                    </Link>
                                </div>
                                <div className="center">
                                    <h3>{comicData.title}</h3>
                                </div>
                                <div className="right">
                                    {(isComicAdded &&
                                        <div className="icon-button" onClick={handleRemoveLockerItem}>
                                            <img className="icon" src={remove} alt="Remove" />
                                        </div>)}
                                    {(!isComicAdded &&
                                        <div className="icon-button" onClick={handleAddLockerItem}>
                                            <img className="icon" src={plus} alt="Add" />
                                        </div>)}
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
                                        <Link className="creator-image-container" to={`/creator?id=${creatorData.id}`}>
                                            <div className="creator-image" style={creatorStyle}></div>
                                            <img src={badgeempty} alt="" className="badge" />
                                        </Link>
                                        <div className="creator-info">
                                            <Link to={`/creator?id=${creatorData.id}`}>{creatorData.name}</Link>
                                            <span>{nf.format(creatorData.followers)} followers</span>
                                            <FollowingButton creatorData={creatorData} />
                                        </div>
                                        <a href={creatorData.donateLink} target="_blank" rel="noreferrer">
                                            <img src={donate} alt="Donate" className="icon" />
                                        </a>
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
                                    <NavLink key={episode.number}
                                        to={`/episode?id=${comicData.id}&episodeId=${episode.number}`}
                                        className="episode-row">
                                        <div className="episode-number">{episode.number}</div>
                                        <div>
                                            <div className="episode-image" style={episodeStyle}>
                                                <div className="overlay"></div>
                                            </div>
                                        </div>
                                        <div className="episode-title">{episode.title}</div>
                                    </NavLink>)
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