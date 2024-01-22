import { isNotBlank } from "./utils";

export const API_VERSION = 0.1;

function getAPI(entityName, entityId, queryParams) {
    const baseUrl = (window.location.hostname === "localhost")
        ? "http://localhost:4280" // dev server
        : ""
    const qs = (queryParams)
        ? `?${(new URLSearchParams(queryParams)).toString()}`
        : ""
        ;
    return (isNotBlank(entityId))
        ? `${baseUrl}/data-api/rest/${entityName}/Id/${entityId}${qs}`
        : `${baseUrl}/data-api/rest/${entityName}${qs}`;
}

export async function loadComics(dispatch) {
    // load data from database and set via reducer
    dispatch({
        type: "setLoadingComics",
        loadingComics: true
    });

    const response = await fetch(getAPI("Comics"));
    const jsonData = await response.json();
    try {
        console.log("jsonData:", JSON.stringify(jsonData.value));
        dispatch({
            type: "setComics",
            comics: jsonData.value || []
        });
    } catch (error) {
        console.log(error)
    }
}
export async function loadCreators(dispatch) {
    // load data from database and set via reducer
    dispatch({
        type: "setLoadingCreators",
        loadingCreators: true
    });

    const response = await fetch(getAPI("Creators"));
    const jsonData = await response.json();
    try {
        console.log("jsonData:", JSON.stringify(jsonData.value))
        dispatch({
            type: "setCreators",
            creators: jsonData.value || []
        });
    } catch (error) {
        console.log(error);
    }
}
export function loadEpisodesByComicId(dispatch, comicId) {
    // load data from database and set via reducer
    dispatch({
        type: "setLoadingEpisodes",
        loadingEpisodes: true
    });

    fetch(getAPI("EpisodesByComicId", null, { ComicId: comicId }))
        .then((response) => response.json())
        .then((jsonData) => {
            dispatch({
                type: "setEpisodes",
                episodes: jsonData.value || []
            });
        })
        .catch((error) => console.log(error));
}
