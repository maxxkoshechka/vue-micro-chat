import { createStore, createLogger } from 'vuex'
import chat from './modules/chat'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
    modules: {
        chat
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})
