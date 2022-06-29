import { AxiosInstance } from 'axios';
import { IAxiosCacheAdapterOptions, setup } from 'axios-cache-adapter';

export type RequestOptions = {
    method: 'DELETE' | 'GET' | 'HEAD' | 'PATCH' | 'POST' | 'PUT';
    url: string;
    headers: {
        [header: string]: any;
    };
    data?: any;
    mock?: any;
};

export interface IRequestConfig extends IAxiosCacheAdapterOptions {
    baseUrl?: string;
    headers?: Record<'header', string | number | undefined>;
    logger?: unknown;
    timeout?: number;
}

export interface IRequestParams {
    requestOptions: Omit<RequestOptions, 'headers'> & {
        headers?: {
            [header: string]: any;
        };
    };
    response: any;
}

export class Request {
    private readonly axios: AxiosInstance;

    constructor(option: IRequestConfig = {}) {
        this.axios = setup({
            baseURL: option.baseUrl || 'http://localhost',
            timeout: option.timeout || 10000,
            headers: {
                Accept: 'application/json',
                ...option.headers,
            },
            cache: {
                maxAge: 0,
            },
        });
    }

    public async request<T extends IRequestParams>(options: T['requestOptions']): Promise<T['response']> {
        if (options.mock) {
            return Promise.resolve(options.mock);
        }
        try {
            const response = await this.axios.request<T['response']>(options);

            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
