import { channelLogic } from '@/config/api'
import { HttpService } from '@/services/Http';
import {deepClone} from '@/utils/index';

// review: if t.deepClone or post or strFormat modified, update bin/generate.py
/* tslint:disable */
export class GatewayService extends HttpService {
    constructor() {
        super('/api');
    }
}
