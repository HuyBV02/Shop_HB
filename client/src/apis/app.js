import axios from '../axios';

export const apiGetCategory = () => axios({
    url: '/productcategory',
    method: 'get'
})