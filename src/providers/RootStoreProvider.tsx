import { enableStaticRendering } from 'mobx-react-lite';
import React, { createContext, FC, ReactNode, useContext } from 'react';
import { RootStore, RootStoreHydration } from '../stores/RootStore/RootStore';

enableStaticRendering(typeof window === 'undefined');

let store: RootStore;
const StoreContext = createContext<RootStore | undefined>(undefined);
StoreContext.displayName = 'StoreContext';

export function useRootStore(): RootStore {
    const context = useContext(StoreContext);
    if (context === undefined) {
        throw new Error('useRootStore must be used within RootStoreProvider');
    }

    return context;
}

export function RootStoreProvider({
    children,
    hydrationData,
}: {
    children: ReactNode;
    hydrationData?: RootStoreHydration;
}): ReturnType<FC> {
    const initialStore = initializeStore(hydrationData);

    return <StoreContext.Provider value={initialStore}>{children}</StoreContext.Provider>;
}

function initializeStore(initialData?: RootStoreHydration): RootStore {
    const _store = store ?? new RootStore();

    if (initialData) {
        _store.hydrate(initialData);
    }
    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') {
        return _store;
    }
    // Create the store once in the client
    if (!store) {
        store = _store;
    }

    return _store;
}
