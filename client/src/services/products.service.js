const axios = require('axios').default

export class ProductService {

    read() {
        return axios.get('/products')
    }

    delete(id) {
        return axios.delete(`/products/${id}`)
    }
}