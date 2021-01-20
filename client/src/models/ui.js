import { action } from 'easy-peasy'

const uiModel = {
  menuOpened: false,

  toggleMenu: action((state, payload) => ({
    menuOpened: payload
  }))
}

export default uiModel