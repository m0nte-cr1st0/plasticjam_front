import ax from 'axios'
import { apiHost } from '../config'

export const axios = ax

export default {
    install (Vue) {
        Vue.prototype.$axios = ax
        Vue.prototype.$axios = axios.create({ baseURL: apiHost })
    }
}
