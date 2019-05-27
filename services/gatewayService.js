import { channelLogic } from '@/config/api'
import { HttpService } from '@/services/Http';
import {deepClone} from '@/utils/index';

// review: if t.deepClone or post or strFormat modified, update bin/generate.py
/* tslint:disable */
class GatewayService extends HttpService {
    constructor() {
        super('/api');
    }
}

export class testApi extends GatewayService {
    constructor() {
        super();
    }

    async Login(req) {
        const config = deepClone(channelLogic.Login);
        return this.get(req, config);
    }
}