import { createContext, useContext } from 'react';
import { CommonApi } from './common/endpoints';
import { Request } from './request';

type ApiProps = {
    baseUrl: string;
    apiEndpoint: string;
};

type ApiReturn = {
    cm: CommonApi;
};

export const ApiContext = createContext<ApiReturn | null>(null);

export const createApi = ({ baseUrl, apiEndpoint }: ApiProps): ApiReturn => {
    const apiUrl = `${baseUrl}${apiEndpoint ? `/${apiEndpoint}` : ''}`;
    const request = new Request({ baseUrl: apiUrl });

    return {
        cm: new CommonApi({ request }),
    };
};

export const useApi = (): ApiReturn => {
    const api = useContext(ApiContext);

    if (!api) {
        throw new Error('useApi() следует использовать внутри ApiContext.provider');
    }

    return api;
};
