import { Request } from '../request';

export class CommonApi {
    private readonly request: Request;
    private readonly fetch: Request['request'];

    constructor({ request }: { request: Request }) {
        this.request = request;
        this.fetch = this.request.request.bind(this.request);
    }

    async getPersons(): Promise<any> {
        return this.fetch({
            url: '/users',
            method: 'GET',
        });
    }
}
