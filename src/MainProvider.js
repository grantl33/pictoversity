import { useReducer } from "react";
import { MainContext, MainDispatchContext } from "./MainContext";

export const initialState = {
    appInfo: [],
    loadingLockerItems: false,
    lockerItems: [],
    loadingFollowingCreators: false,
    followingCreators: [],
    alertText: null,
    modalContent: {
        title: null,
        content: null,
    },
    loadingComics: false,
    comics: [],
    loadingCreators: false,
    creators: [],
    loadingEpisodes: false,
    episodes: [],
    loadingMember: false,
    member: null,
    loadingComments: false,
    comments: []
}

export function mainReducer(state, action) {
    switch (action.type) {
        case "setAppInfo":
            return {
                ...state,
                appInfo: action.appInfo
            }
        case "setLoadingMember":
            return {
                ...state,
                loadingMember: action.loadingMember
            }
        case "setMember":
            return {
                ...state,
                loadingMember: false,
                member: action.member
            }
        case "setLoadingComics":
            return {
                ...state,
                loadingComicsData: action.loadingComics
            }
        case "setLoadingCreators":
            return {
                ...state,
                loadingCreators: action.loadingCreators
            }
        case "setLoadingEpisodes":
            return {
                ...state,
                loadingEpisodes: action.loadingEpisodes
            }
        case "setComics":
            return {
                ...state,
                comics: action.comics,
                loadingComics: false,
            }
        case "setCreators":
            return {
                ...state,
                creators: action.creators,
                loadingCreators: false,
            }
        case "setEpisodes":
            return {
                ...state,
                episodes: action.episodes,
                loadingEpisodes: false,
            }
        case "setAlertText":
            return {
                ...state,
                alertText: action.alertText,
            }
        case "setModalContent":
            return {
                ...state,
                modalContent: action.modalContent,
            }
        case "setLoadingLockerItems":
            return {
                ...state,
                loadingLockerItems: action.loadingLockerItems,
            }
        case "setLockerItems":
            return {
                ...state,
                lockerItems: action.lockerItems,
            }
        case "setLoadingFollowingCreators":
            return {
                ...state,
                loadingFollowingCreators: action.loadingFollowingCreators,
            }
        case "setFollowingCreators":
            return {
                ...state,
                followingCreators: action.followingCreators,
            }
        case "setLoadingComments":
            return {
                ...state,
                loadingComments: action.loadingComments,
            }
        case "setComments":
            return {
                ...state,
                comments: action.comments,
            }
        default:
            throw Error(`Unknown action: ${action.type}`);
    }
}

export default function MainProvider({ children }) {
    const [main, dispatch] = useReducer(mainReducer, initialState);
    return (
        <MainContext.Provider value={main}>
            <MainDispatchContext.Provider value={dispatch}>
                {children}
            </MainDispatchContext.Provider>
        </MainContext.Provider>
    )
}