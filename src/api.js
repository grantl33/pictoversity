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

export async function loadAppInfo(dispatch) {
    // load data from database and set via reducer
    const response = await fetch(getAPI("AppInfo"));
    const jsonData = await response.json();
    try {
        dispatch({
            type: "setAppInfo",
            appInfo: jsonData.value || []
        });
    } catch (error) {
        console.log(error)
    }
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


export async function followCreator(dispatch, memberId, creatorObj) {
    // load data from database and set via reducer
    dispatch({
        type: "setLoadingFollowingCreators",
        loadingFollowingCreators: true
    });
    const response = await fetch(getAPI("LockerCreators"), {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            MEMBER_ID: memberId,
            CREATOR_ID: creatorObj.Id
        })
    });
    const jsonData = await response.json();
    try {
        const lockerCreatorsObj = (Array.isArray(jsonData.value))
            ? jsonData.value[0]
            : jsonData.value;
        if (isNullOrUndefined(lockerCreatorsObj)) {
            dispatch({
                type: "setAlertText",
                alertText: "Follow failed, please try again."
            });
        } else {
            // refetch
            loadLockerCreatorsByMemberId(dispatch, memberId);
            dispatch({
                type: "setAlertText",
                alertText: `Following ${creatorObj.NAME}`
            });
        }
    } catch (error) {
        console.log(error);
    }
}


export async function unfollowCreator(dispatch, lockerCreatorsId, memberId, creatorObj) {
    // load data from database and set via reducer
    dispatch({
        type: "setLoadingFollowingCreators",
        loadingFollowingCreators: true
    });
    await fetch(getAPI("LockerCreators", lockerCreatorsId), {
        method: "delete"
    });
    try {
        // refetch
        loadLockerCreatorsByMemberId(dispatch, memberId);
        dispatch({
            type: "setAlertText",
            alertText: `Unfollowed ${creatorObj.NAME}`
        });
    } catch (error) {
        console.log(error);
    }
}
export async function loadLockerCreatorsByMemberId(dispatch, memberId) {
    // load data from database and set via reducer
    dispatch({
        type: "setLoadingFollowingCreators",
        loadingFollowingCreators: true
    });

    const response = await fetch(getAPI("LockerCreatorsByMemberId", null, { MemberId: memberId }));
    const jsonData = await response.json();
    try {
        dispatch({
            type: "setFollowingCreators",
            followingCreators: jsonData.value || []
        });

        dispatch({
            type: "setLoadingFollowingCreators",
            loadingFollowingCreators: false
        });
    } catch (error) {
        console.log(error);
    }
}



export async function addLockerItem(dispatch, memberId, comicObj) {
    // load data from database and set via reducer
    dispatch({
        type: "setLoadingLockerItems",
        loadingLockerItems: true
    });
    const response = await fetch(getAPI("LockerComics"), {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            MEMBER_ID: memberId,
            COMIC_ID: comicObj.Id
        })
    });
    const jsonData = await response.json();
    try {
        const lockerComicsObj = (Array.isArray(jsonData.value))
            ? jsonData.value[0]
            : jsonData.value;
        if (isNullOrUndefined(lockerComicsObj)) {
            dispatch({
                type: "setAlertText",
                alertText: "Add to locker failed, please try again."
            });
        } else {
            // refetch
            loadLockerComicsByMemberId(dispatch, memberId);
            dispatch({
                type: "setAlertText",
                alertText: `Added ${comicObj.TITLE} to locker`
            });
        }
    } catch (error) {
        console.log(error);
    }
}


export async function removeLockerItem(dispatch, lockerComicsId, memberId, comicObj) {
    // load data from database and set via reducer
    dispatch({
        type: "setLoadingLockerItems",
        loadingLockerItems: true
    });
    await fetch(getAPI("LockerComics", lockerComicsId), {
        method: "delete"
    });
    try {
        // refetch
        loadLockerComicsByMemberId(dispatch, memberId);
        dispatch({
            type: "setAlertText",
            alertText: `Removed ${comicObj.TITLE} from locker`
        });
    } catch (error) {
        console.log(error);
    }
}

export async function loadLockerComicsByMemberId(dispatch, memberId) {
    // load data from database and set via reducer
    dispatch({
        type: "setLoadingLockerItems",
        loadingLockerItems: true
    });

    const response = await fetch(getAPI("LockerComicsByMemberId", null, { MemberId: memberId }));
    const jsonData = await response.json();
    try {
        dispatch({
            type: "setLockerItems",
            lockerItems: jsonData.value || []
        });

        dispatch({
            type: "setLoadingLockerItems",
            loadingLockerItems: false
        });
    } catch (error) {
        console.log(error);
    }
}

export async function loadCommentsByEpisodeId(dispatch, episodeId) {
    // load data from database and set via reducer
    dispatch({
        type: "setLoadingComments",
        loadingComments: true
    });

    const response = await fetch(getAPI("CommentsByEpisodeId", null, { EpisodeId: episodeId }));
    const jsonData = await response.json();
    try {
        dispatch({
            type: "setComments",
            comments: jsonData.value || []
        });

        dispatch({
            type: "setLoadingComments",
            loadingComments: false
        });
    } catch (error) {
        console.log(error);
    }
}

export async function saveComment(dispatch, episodeId, memberId, commentText) {
    // load data from database and set via reducer
    dispatch({
        type: "setLoadingComments",
        loadingComments: true
    });

    const response = await fetch(getAPI("Comments"), {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            EPISODE_ID: episodeId,
            MEMBER_ID: memberId,
            COMMENT_TEXT: commentText
        })
    });
    const jsonData = await response.json();
    try {
        const commentsObj = (Array.isArray(jsonData.value))
            ? jsonData.value[0]
            : jsonData.value;
        if (isNullOrUndefined(commentsObj)) {
            dispatch({
                type: "setAlertText",
                alertText: "Save comment failed, please try again."
            });
        } else {
            // refetch
            loadCommentsByEpisodeId(dispatch, episodeId);

            dispatch({
                type: "setAlertText",
                alertText: 'Comment saved, thank you!'
            });
        }
        dispatch({
            type: "setLoadingComments",
            loadingComments: false
        });
        return commentsObj;
    } catch (error) {
        console.log(error);
    }
    return null;
}
