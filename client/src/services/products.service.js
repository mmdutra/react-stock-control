const axios = require('axios').default

export class ProductService {
    read() {
        return axios.get('/products')
    }
}