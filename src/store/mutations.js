import * as types from './mutation-types'

const mutations = {
  [types.SOCKET_CONNECT](state, connected) {
    // console.log('in')
    state.socketConnectedFlag = connected
    // console.log(state.socketConnectedFlag === true)
  },
  [types.INIT_SOURCES](state, list) {
    state.sources = list
  }
}

export default mutations