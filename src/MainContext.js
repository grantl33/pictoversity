import { createContext, useContext } from "react";

export const MainContext = createContext(null);
export const MainDispatchContext = createContext(null);

// Convenience methods that can be used in components
export function useMainContext() {
    return useContext(MainContext);
}

export function useMainDispatchContext() {
    return useContext(MainDispatchContext);
}
