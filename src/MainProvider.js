import { useReducer } from "react";
import { MainContext, MainDispatchContext } from "./MainContext";

export const initialState = {
    lockerItems: [],
    currentUser: {
        username: "Guest12345",
        email: null,
    },
    alertText: null,
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
            if (lockerItemsRemove.indexOf(action.comicId) > -1) {
                lockerItemsRemove.splice(removeIdx, 1);
            }
            return {
                ...state,
                lockerItems: lockerItemsRemove,
                alertText: action.alertText
            }
        case "setCurrentUser":
            return {
                ...state,
                currentUser: action.currentUser,
            }
        case "setAlertText":
            return {
                ...state,
                alertText: action.alertText,
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