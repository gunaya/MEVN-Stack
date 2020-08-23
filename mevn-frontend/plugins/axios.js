export default ({ $axios, store}) => {
    $axios.onRequest((config) => {
        config.headers.common['auth'] = `${store.state.auth}`
    });
}