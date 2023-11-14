import { useReducer } from "react";
import { MainContext, MainDispatchContext } from "./MainContext";

export const initialState = {
    lockerItems: [],
    followingCreators: [],
    currentUser: {
        username: "Guest12345",
        email: null,
    },
    alertText: null,
    modalContent: {
        title: null,
        content: null,
    }
}

export function mainReducer(state, action) {
    switch (action.type) {
        case "addLockerItem":
            const lockerItemsAdd = [...state.lockerItems];
            if (!lockerItemsAdd.includes(action.comicId)) {
                lockerItemsAdd.push(action.comicId);
            }
            return {
                ...state,
                lockerItems: lockerItemsAdd,
                alertText: action.alertText
            }
        case "removeLockerItem":
            const lockerItemsRemove = [...state.lockerItems];
            const removeIdx = lockerItemsRemove.indexOf(action.comicId);
            if (removeIdx > -1) {
                lockerItemsRemove.splice(removeIdx, 1);
            }
            return {
                ...state,
                lockerItems: lockerItemsRemove,
                alertText: action.alertText
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
        case "setCurrentUsername":
            const updatedCurrentUser = {
                ...state.currentUser,
                username: action.username
            }
            return {
                ...state,
                currentUser: updatedCurrentUser
            }
        case "addFollowCreator":
            const addFollowingCreators = [...state.followingCreators];
            if (!addFollowingCreators.includes(action.creatorId)) {
                addFollowingCreators.push(action.creatorId);
            }
            return {
                ...state,
                followingCreators: addFollowingCreators,
                alertText: action.alertText
            }
        case "removeFollowCreator":
            const removeFollowingCreators = [...state.followingCreators];
            const removeCreatorIdx = removeFollowingCreators.indexOf(action.creatorId);
            if (removeCreatorIdx > -1) {
                removeFollowingCreators.splice(removeCreatorIdx, 1);
            }
            return {
                ...state,
                followingCreators: removeFollowingCreators,
                alertText: action.alertText
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