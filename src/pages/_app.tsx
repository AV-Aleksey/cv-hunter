import { NextPage } from 'next';
import { ReactElement } from 'react';
import { RootStoreProvider } from '../providers/RootStoreProvider';

function MyApp({ Component, pageProps }: { Component: NextPage; pageProps: any }): ReactElement {
    return (
        <RootStoreProvider hydrationData={pageProps.hydrationData}>
            <Component {...pageProps} />
        </RootStoreProvider>
    );
}

export default MyApp;
