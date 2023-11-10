import "./episode.css";
import close from "../../assets/icons/x-circle.svg";
import { NavLink, useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import ComicData from "../../comicData";

function Episode() {
    const { search } = useLocation();
    const [comicData, setComicData] = useState();
    const [episodeId, setEpisodeId] = useState();

    useMemo(() => {
        const query = new URLSearchParams(search);
        const comicId = query.get("id");
        const episodeId = query.get("episodeId");
        if (comicId in ComicData) {
            const reqComicData = ComicData[comicId];
            setComicData(reqComicData);
        } else {
            setComicData(null);
        }
        setEpisodeId(episodeId);
    }, [search]);

    const episodeData = (episodeId != null && comicData != null)
        ? comicData.episodes.find((episode) => episode.number === parseInt(episodeId))
        : null;
    return (
        <div className="episode">
            {(comicData == null || episodeData == null) && <>Error: Comic not found!</>}
            {(comicData != null && episodeData != null) &&
                <>
                    <div className="episode-header">
                        <div className="episode-content">
                            <div className="episode-topbar">
                                <div></div>
                                <div className="center">
                                    <h3>Episode {episodeData.number}: {episodeData.title}</h3>
                                </div>
                                <div className="right">
                                    <NavLink to={`/details?id=${comicData.id}`} className="icon-button">
                                        <img className="icon" src={close} alt="Close" />
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="episode-body">
                        <div className="episode-container">
                            <img src={episodeData.contents} alt="" />
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default Episode;