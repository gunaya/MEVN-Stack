const cookieparser = process.server ? require('cookieparser') : undefined;

export default {
  async setUsername({ commit }, user) {
    commit("SET_USERNAME", user);
  },

  async setUserData({commit}, user_data) {
    commit("SET_USERDATA", user_data);
    // console.log(user_data)
  }
  
};
