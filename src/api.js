import { isNotBlank, isNullOrUndefined } from "./utils";

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
    //let response = await fetch(getAPI("AppInfo"));
    let response = await fetchWithRetry(getAPI("AppInfo"));
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

    let response = await fetchWithRetry(getAPI("Comics"));
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

    let response = await fetchWithRetry(getAPI("Creators"));
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

    let response = await fetchWithRetry(getAPI("EpisodesByComicId", null, { ComicId: comicId }));
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

    const payload = {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(memberObj)
    };
    let response = await fetch(fetchWithRetry("Members"), payload);
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

    const payload = {
        Email: memberObj.email,
        Combo: memberObj.combo,
    };
    const fetchOpts = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    let response = await fetchWithRetry(getAPI("MembersLogin", null, payload), fetchOpts);
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
    const fetchOpts = {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            MEMBER_ID: memberId,
            CREATOR_ID: creatorObj.Id
        })
    };
    let response = await fetchWithRetry(getAPI("LockerCreators"), fetchOpts);
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
    const fetchOpts = {
        method: "delete"
    };
    await fetchWithRetry(getAPI("LockerCreators", lockerCreatorsId), fetchOpts);
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

    let response = await fetchWithRetry(getAPI("LockerCreatorsByMemberId", null, { MemberId: memberId }));
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
    const fetchOpts = {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            MEMBER_ID: memberId,
            COMIC_ID: comicObj.Id
        })
    };
    let response = await fetchWithRetry(getAPI("LockerComics"), fetchOpts);
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
    const fetchOpts = {
        method: "delete"
    };
    await fetchWithRetry(getAPI("LockerComics", lockerComicsId), fetchOpts);
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

    let response = await fetchWithRetry(getAPI("LockerComicsByMemberId", null, { MemberId: memberId }));
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

    let response = await fetchWithRetry(getAPI("CommentsByEpisodeId", null, { EpisodeId: episodeId }));
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

    const fetchOpts = {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            EPISODE_ID: episodeId,
            MEMBER_ID: memberId,
            COMMENT_TEXT: commentText
        })
    };
    let response = await fetchWithRetry(getAPI("Comments"), fetchOpts);
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

export async function loadNotificationsByMemberId(dispatch, memberId) {
    // load data from database and set via reducer
    dispatch({
        type: "setLoadingNotifications",
        loadingNotifications: true
    });

    let response = await fetchWithRetry(getAPI("NotificationsByMemberId", null, { MemberId: memberId }));
    const jsonData = await response.json();
    try {
        dispatch({
            type: "setNotifications",
            notifications: jsonData.value || []
        });

        dispatch({
            type: "setLoadingNotifications",
            loadingNotifications: false
        });
    } catch (error) {
        console.log(error);
    }
}

export async function removeNotification(dispatch, memberId, notificationId) {
    // load data from database and set via reducer
    dispatch({
        type: "setLoadingNotifications",
        loadingNotifications: true
    });
    const fetchOpts = {
        method: "delete"
    };
    await fetchWithRetry(getAPI("Notifications", notificationId), fetchOpts);
    try {
        // refetch
        loadNotificationsByMemberId(dispatch, memberId);
    } catch (error) {
        console.log(error);
    }
}

// simple delay mechanism
const wait = (delay) => (new Promise((resolve) => setTimeout(resolve, delay)));

export async function fetchWithRetry(apiPath, retryCount = 0) {
    console.log("request:", apiPath);
    let response = await fetch(apiPath, {});
    if (response.ok === false) {
        console.log(`request failed (attempts: ${retryCount})`);
        if (retryCount < 5) {
            console.log("retrying...");
            const delay = retryCount * 1000; // simple backoff
            await wait(delay);
            response = await fetchWithRetry(apiPath, retryCount + 1);
        } else {
            console.log(`too many request attempts: ${retryCount}`);
        }
    }
    return response;
}