import {
	apiRoute
} from '@/config/api'
import {
	HttpService
} from '@/services/Http';
import {
	deepClone
} from '@/utils/index';

// review: if t.deepClone or post or strFormat modified, update bin/generate.py
/* tslint:disable */
export class GatewayService extends HttpService {
	constructor(module) {
		super('/api');

		if (!apiRoute[module]) {
			console.warn(`${module} is not found in apiRoute`)
		} else {
			for (let key in apiRoute[module]) {
				if (apiRoute[module][key].type == 'get') {
					this[key] = function(req) {
						let config = deepClone(apiRoute[module][key]);
						return this.get(req, config)
					}
				} else {
					this[key] = function(req) {
						let config = deepClone(apiRoute[module][key]);
						return this.post(req, config)
					}
				}
			}
		}
	}
}
