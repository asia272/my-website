"use client";

import { createContext, useContext, useState } from "react";

type PreloaderContextType = {
    done: boolean;
    setDone: (value: boolean) => void;
};

const PreloaderContext = createContext<PreloaderContextType>({
    done: false,
    setDone: () => { },
});

export const usePreloader = () => useContext(PreloaderContext);

export function PreloaderProvider({ children }: { children: React.ReactNode }) {
    const [done, setDone] = useState(false);

    return (
        <PreloaderContext.Provider value={{ done, setDone }}>
            {children}
        </PreloaderContext.Provider>
    );
}