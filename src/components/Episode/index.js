import "./episode.css";
import close from "../../assets/icons/x-circle.svg";
import { NavLink, useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import { useMainContext } from "../../MainContext";
import { isNullOrUndefined } from "../../utils";

function Episode() {
    const [comicData, setComicData] = useState(null);
    const [episodeData, setEpisodeData] = useState(null);
    const { search } = useLocation();
    // Use main context to read from state
    const mainContext = useMainContext();
    const {
        comics,
        episodes,
    } = mainContext;

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
            const reqEpisodeData = episodes.find((episode) => episode.EPISODE_NUMBER === episodeNumber)
            setEpisodeData(reqEpisodeData);
        }
    }, [search, comics, episodes]);

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
                            <img src={`/images/episodes/${comicData.COVER_IMAGE}_${episodeData.EPISODE_NUMBER}.png`} alt="" />
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default Episode;