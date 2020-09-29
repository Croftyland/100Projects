import {callApi} from "../apis/apiHelper";

export function getImages() {
    // http://www.mocky.io/v2/5e6669803100002293239f9d
        try {
            const endpoint = 'v2/5e6669803100002293239f9d';
            const apiResult = callApi(endpoint, 'GET');
            return apiResult
        } catch (error) {
            throw error;
        }
}