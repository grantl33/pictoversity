import "./details.css";
import arrowleft from "../../assets/icons/arrow-left.svg";
import plus from "../../assets/icons/plus-circle.svg";
import remove from "../../assets/icons/dash-circle.svg";
import donate from "../../assets/icons/donate.svg";
import badgeempty from "../../assets/icons/person-badge-empty.svg";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useMainContext, useMainDispatchContext } from "../../MainContext";
import FollowingButton from "../FollowingButton";
import { addLockerItem, loadEpisodesByComicId, removeLockerItem } from "../../api";
import { isNullOrUndefined } from "../../utils";
import LoadingSpinner from "../LoadingSpinner";

function Details() {
    const { search } = useLocation();
    const [comicData, setComicData] = useState();
    // Use main context to read from state
    const mainContext = useMainContext();
    const {
        member,
        lockerItems,
        comics,
        creators,
        episodes,
        loadingEpisodes,
    } = mainContext;

    // Use dispatch context for updating the main state
    const dispatch = useMainDispatchContext();

    useMemo(() => {
        const query = new URLSearchParams(search);
        const comicId = query.get("id");
        if (comics && comics.length > 0) {
            const reqComicData = comics.find((comic) => parseInt(comicId) === comic.Id);
            if (reqComicData && reqComicData.Id) {
                setComicData(reqComicData);
            } else {
                setComicData(null);
            }
        }
    }, [search, comics]);

    useEffect(() => {
        if (comicData && comicData.Id != null)
            loadEpisodesByComicId(dispatch, comicData.Id);
    }, [comicData, dispatch]);


    const style = (comicData != null) ? {
        backgroundImage: `url('/images/covers/${comicData.COVER_IMAGE}.png')`
    } : null;

    const creatorData = (!isNullOrUndefined(creators) && !isNullOrUndefined(comicData))
        ? creators.find((creator) => comicData.CREATOR_ID === creator.Id)
        : null;

    const creatorStyle = (!isNullOrUndefined(creatorData)) ? {
        backgroundImage: `url('/images/profiles/${creatorData.USERNAME}.png')`
    } : null;


    const nf = new Intl.NumberFormat("en-US", {
        useGrouping: true,
        style: "decimal"
    });
    const lockerItem = (!isNullOrUndefined(comicData))
        ? lockerItems.find((lockerItem) => lockerItem.COMIC_ID === comicData.Id)
        : null;
    const isComicAdded = !isNullOrUndefined(lockerItem);

    const handleAddLockerItem = () => {
        if (isNullOrUndefined(member)) {
            dispatch({
                type: "setAlertText",
                alertText: "Please login/register first!"
            });
        } else {
            addLockerItem(dispatch, member.Id, comicData);
        }
    }

    const handleRemoveLockerItem = () => {
        if (!isNullOrUndefined(lockerItem)) {
            removeLockerItem(dispatch, lockerItem.Id, member.Id, comicData);
        }
    }

    const episodesFiltered = [];
    if (episodes && episodes.length > 0 && !loadingEpisodes && !isNullOrUndefined(comicData)) {
        for (let i = 0; i < episodes.length; i++) {
            const episode = episodes[i];
            if (episode.COMIC_ID === comicData.Id) {
                episodesFiltered.push(episode);
            }
        }
    }

    return (
        <div className="details">
            {(isNullOrUndefined(comicData) || isNullOrUndefined(creatorData)) && <>Error: Comic not found!</>}
            {(!isNullOrUndefined(comicData) && !isNullOrUndefined(creatorData)) &&
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
                                    <h3>{comicData.TITLE}</h3>
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
                                    <p>{comicData.SUMMARY}</p>
                                    <div className="info-actions">
                                        <Link className="creator-image-container" to={`/creator?id=${creatorData.Id}`}>
                                            <div className="creator-image" style={creatorStyle}></div>
                                            <img src={badgeempty} alt="" className="badge" />
                                        </Link>
                                        <div className="creator-info">
                                            <Link to={`/creator?id=${creatorData.Id}`}>{creatorData.NAME}</Link>
                                            <span>{nf.format(creatorData.FOLLOWERS)} follower{(creatorData.FOLLOWERS > 1 ? "s" : "")}</span>
                                            <FollowingButton creatorData={creatorData} />
                                        </div>
                                        <a href={creatorData.DONATE_LINK} target="_blank" rel="noreferrer">
                                            <img src={donate} alt="Donate" className="icon" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="details-body">
                        <div className="episodes-container">
                            {loadingEpisodes && <div className="empty-state"><LoadingSpinner /></div>}
                            {(!loadingEpisodes && episodesFiltered) && episodesFiltered.map((episode) => {
                                const episodeStyle = {
                                    backgroundImage: `url('/images/covers/${comicData.COVER_IMAGE}_${episode.EPISODE_NUMBER}.png')`
                                }
                                return (
                                    <NavLink key={episode.EPISODE_NUMBER}
                                        to={`/episode?id=${comicData.Id}&episodeNumber=${episode.EPISODE_NUMBER}`}
                                        className="episode-row">
                                        <div className="episode-number">{episode.EPISODE_NUMBER}</div>
                                        <div>
                                            <div className="episode-image" style={episodeStyle}>
                                                <div className="overlay"></div>
                                            </div>
                                        </div>
                                        <div className="episode-title">{episode.TITLE}</div>
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