import axios from 'axios';

export default function setupAxios(): void {
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
}
