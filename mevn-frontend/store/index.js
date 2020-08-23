const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => {
    return {
        auth: null
    }
}
export const mutations = {
    setAuth(state, auth) {
        state.auth = auth
    }
}
export const actions = {
    nuxtServerInit({ commit }, { req }) {
        let auth = null
        if (req.headers.cookie) {
            const parsed = cookieparser.parse(req.headers.cookie)
            auth = (parsed.auth)
            this.$axios.setHeader('token', auth);
        }
        commit('setAuth', auth)
    }
}