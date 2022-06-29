import { NextPage } from 'next';
import { ReactElement } from 'react';
import { RootStoreProvider } from '../providers/RootStoreProvider';
import { ApiContext, createApi } from '../api';
import { API_SOURCE } from '../api/constants';

function MyApp({ Component, pageProps }: { Component: NextPage; pageProps: any }): ReactElement {
    const api = createApi({
        baseUrl: API_SOURCE,
        apiEndpoint: '',
    });

    return (
        <RootStoreProvider hydrationData={pageProps.hydrationData}>
            <ApiContext.Provider value={api}>
                <Component {...pageProps} />
            </ApiContext.Provider>
        </RootStoreProvider>
    );
}

export default MyApp;
