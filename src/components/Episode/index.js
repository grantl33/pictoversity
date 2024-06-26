import "./episode.css";
import arrowRight from "../../assets/icons/arrow-right-circle.svg";
import arrowLeft from "../../assets/icons/arrow-left-circle.svg";
import studentcard from "../../assets/icons/student_card.svg";
import close from "../../assets/icons/x-circle.svg";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useMainContext, useMainDispatchContext } from "../../MainContext";
import { FULL_MEMBER_TEXT, FULL_MEMBER_TITLE, isNullOrUndefined, isValidFullMember } from "../../utils";
import { loadComics, loadCommentsByEpisodeId, loadEpisodesByComicId, saveComment } from "../../api";
import LoadingSpinner from "../LoadingSpinner";

function Episode() {
    const [comicData, setComicData] = useState(null);
    const [episodeData, setEpisodeData] = useState(null);
    const [memberComment, setMemberComment] = useState(null);
    const [isCommentSaved, setIsCommentSaved] = useState(false);
    const [prevEpisode, setPrevEpisode] = useState(null);
    const [nextEpisode, setNextEpisode] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(null);
    const { search } = useLocation();
    // Use main context to read from state
    const mainContext = useMainContext();
    const {
        member,
        comments,
        comics,
        episodes,
    } = mainContext;

    // Use dispatch context for updating the main state
    const dispatch = useMainDispatchContext();

    useMemo(() => {
        const query = new URLSearchParams(search);
        const comicId = query.get("id");
        // Todo: make path part
        const episodeNumber = query.get("episodeNumber");
        if (comicId && comics && comics.length > 0) {
            const reqComicData = comics.find((comic) => comic.Id === parseInt(comicId));
            setComicData(reqComicData);
        }
        if (episodeNumber && episodes && episodes.length > 0) {
            const reqEpisodeData = episodes.find((episode) => episode.EPISODE_NUMBER === episodeNumber);
            if (!isNullOrUndefined(reqEpisodeData)) {
                if (reqEpisodeData?.Id !== episodeData?.Id) {
                    setImageLoaded(false);
                }
                setEpisodeData(reqEpisodeData);
                setNextEpisode(episodes.find((episode) => parseInt(episode.EPISODE_NUMBER) === (parseInt(reqEpisodeData.EPISODE_NUMBER) + 1)));
                setPrevEpisode(episodes.find((episode) => parseInt(episode.EPISODE_NUMBER) === (parseInt(reqEpisodeData.EPISODE_NUMBER) - 1)));
            }
        }
        setIsCommentSaved(false);
        const containerEl = document.querySelector(".episode-container");
        if (!isNullOrUndefined(containerEl)) containerEl.scrollTop = 0;
    }, [search, comics, episodes, episodeData]);

    useEffect(() => {
        if (comics?.length === 0) {
            loadComics(dispatch);
        }
    }, [dispatch, comics]);

    useEffect(() => {
        if (comicData && comicData.Id != null)
            loadEpisodesByComicId(dispatch, comicData.Id);
    }, [comicData, dispatch]);


    useEffect(() => {
        if (!isNullOrUndefined(episodeData)) {
            loadCommentsByEpisodeId(dispatch, episodeData.Id);
        }
    }, [dispatch, episodeData]);

    async function handleSaveComment() {
        const response = await saveComment(dispatch, episodeData.Id, member.Id, memberComment);
        if (!isNullOrUndefined(response)) {
            setIsCommentSaved(true);
        }
    }

    const handleFullMemberAccessOnly = () => {
        dispatch({
            type: "setModalContent",
            modalContent: {
                title: FULL_MEMBER_TITLE,
                content: FULL_MEMBER_TEXT,
                showReload: false
            },
        });
    }

    const isCrowned = isValidFullMember(member);
    return (
        <div className="episode">
            {(isNullOrUndefined(comicData) || isNullOrUndefined(episodeData)) && <>Error: Comic not found!</>}
            {(!isNullOrUndefined(comicData) && !isNullOrUndefined(episodeData)) &&
                <>
                    <div className="episode-header">
                        <div className="episode-content">
                            <div className="episode-topbar">
                                <div></div>
                                <div className="center">
                                    <h3>Episode {episodeData.EPISODE_NUMBER}: {episodeData.TITLE}</h3>
                                </div>
                                <div className="right">
                                    <NavLink to={`/details?id=${comicData.Id}`} className="icon-button">
                                        <img className="icon" src={close} alt="Close" />
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="episode-body">
                        <div className="episode-container">
                            {!imageLoaded && <div className="spinner-abs"><LoadingSpinner /></div>}
                            <img key={`{comicData.COVER_IMAGE}_${episodeData.EPISODE_NUMBER}`}
                                src={require(`../../assets/episodes/${comicData.COVER_IMAGE}_${episodeData.EPISODE_NUMBER}.png`)}
                                className="image-episode"
                                alt={`Episode ${episodeData.EPISODE_NUMBER}`}
                                onLoad={() => {
                                    setImageLoaded(true);
                                }}
                            />
                            {imageLoaded &&
                                <div className="episode-postroll">
                                    {(!isNullOrUndefined(nextEpisode) || !isNullOrUndefined(prevEpisode)) &&
                                        <div className="episode-nav">
                                            <div className="prev">
                                                {!isNullOrUndefined(prevEpisode) &&
                                                    <NavLink key={prevEpisode.EPISODE_NUMBER}
                                                        to={`/episode?id=${comicData.Id}&episodeNumber=${prevEpisode.EPISODE_NUMBER}`}
                                                    ><img src={arrowLeft} alt="Next" /> Prev</NavLink>
                                                }
                                            </div>
                                            <div className="next">
                                                <>
                                                    {!isNullOrUndefined(nextEpisode) && (nextEpisode.IS_FREE || isCrowned) &&
                                                        <NavLink key={nextEpisode.EPISODE_NUMBER}
                                                            to={`/episode?id=${comicData.Id}&episodeNumber=${nextEpisode.EPISODE_NUMBER}`}
                                                        >Next <img src={arrowRight} alt="Next" /></NavLink>
                                                    }
                                                    {!isNullOrUndefined(nextEpisode) && (!nextEpisode.IS_FREE && !isCrowned) &&
                                                        <div onClick={handleFullMemberAccessOnly}>Next <img src={arrowRight} alt="Next" /></div>
                                                    }
                                                </>
                                            </div>
                                        </div>
                                    }
                                    <div className="episode-comments-bar">
                                        <h3>Comments</h3>
                                    </div>
                                    <div className="episode-comments">
                                        {(isCrowned && !isCommentSaved) &&
                                            <div className="comment-field">
                                                <textarea rows={2} onChange={(e) => {
                                                    setMemberComment(e.target.value);
                                                }} placeholder="Add your comments" />
                                                <button onClick={handleSaveComment} >Add Comment</button>
                                            </div>
                                        }
                                        {!isCrowned &&
                                            <div className="comment-row">
                                                <div className="comment-empty">You must be a full member to add comments.</div>
                                            </div>
                                        }
                                        {!isNullOrUndefined(comments) && comments.map((commentObj) =>
                                            <div className="comment-row" key={commentObj.Id}>
                                                <div className="comment-info">
                                                    <div className="comment-name">
                                                        <img src={studentcard} alt="Member" />
                                                        {commentObj.MEMBER_NAME}</div>
                                                    <div className="comment-date">{(new Date(commentObj.CREATED_ON)).toLocaleDateString()}</div>
                                                </div>
                                                <div className="comment-text">{commentObj.COMMENT_TEXT}</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default Episode;