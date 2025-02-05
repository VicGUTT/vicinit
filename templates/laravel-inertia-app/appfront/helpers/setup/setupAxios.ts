import axios from 'axios';
// import requestInterceptors from '@/Support/Axios/Interceptors/Request/index.js';
// import responseInterceptors from '@/Support/Axios/Interceptors/Reponse/index.js';

export default function setupAxios(): void {
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    /**
     * @see https://axios-http.com/docs/interceptors
     */
    // requestInterceptors.forEach((interceptor) => {
    //     axios.interceptors.request.use((config) => interceptor(config));
    // });
    // responseInterceptors.forEach((interceptor) => {
    //     axios.interceptors.response.use((response) => interceptor(response));
    // });
}
