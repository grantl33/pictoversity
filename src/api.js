import { isNotBlank, isNullOrUndefined } from "./utils";

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
        dispatch({
            type: "setCreators",
            creators: jsonData.value || []
        });
    } catch (error) {
        console.log(error);
    }
}
export async function loadEpisodesByComicId(dispatch, comicId) {
    // load data from database and set via reducer
    dispatch({
        type: "setLoadingEpisodes",
        loadingEpisodes: true
    });

    const response = await fetch(getAPI("EpisodesByComicId", null, { ComicId: comicId }));
    const jsonData = await response.json();
    try {
        dispatch({
            type: "setEpisodes",
            episodes: jsonData.value || []
        });
    } catch (error) {
        console.log(error);
    }
}

export async function createMember(dispatch, memberObj) {
    // load data from database and set via reducer
    dispatch({
        type: "setLoadingMember",
        loadingMember: true
    });

    const response = await fetch(getAPI("Members"), {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(memberObj)
    });
    const jsonData = await response.json();
    try {
        const memberObj = (Array.isArray(jsonData.value))
            ? jsonData.value[0]
            : jsonData.value;
        if (isNullOrUndefined(memberObj)) {
            dispatch({
                type: "setAlertText",
                alertText: "Registration failed, please try again."
            });
        } else {
            dispatch({
                type: "setMember",
                member: memberObj
            });

            dispatch({
                type: "setAlertText",
                alertText: `Welcome, ${memberObj.NAME}!`
            });
        }
        dispatch({
            type: "setLoadingMember",
            loadingMember: false
        });
    } catch (error) {
        console.log(error);
    }
}


export async function loadMember(dispatch, memberObj) {
    // load data from database and set via reducer
    dispatch({
        type: "setLoadingMember",
        loadingMember: true
    });

    const response = await fetch(getAPI("MembersLogin", null, {
        Email: memberObj.email,
        Combo: memberObj.combo,
    }), {
        headers: {
            "Content-Type": "application/json"
        }
    });
    const jsonData = await response.json();
    try {
        const memberObj = (Array.isArray(jsonData.value))
            ? jsonData.value[0]
            : jsonData.value;

        if (isNullOrUndefined(memberObj)) {
            dispatch({
                type: "setAlertText",
                alertText: "Login failed, please try again."
            });
        } else {
            dispatch({
                type: "setMember",
                member: memberObj
            });
            dispatch({
                type: "setAlertText",
                alertText: `Welcome back, ${memberObj.NAME}!`
            });
        }
        dispatch({
            type: "setLoadingMember",
            loadingMember: false
        });
    } catch (error) {
        console.log(error);
    }
}

