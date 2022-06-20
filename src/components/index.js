// modules
import { Layout } from './layout';
import { Menu } from './menu';
import { LoadingOverlay } from './loadingOverlay'

const moduleMap = {
  Layout,
  Menu,
  LoadingOverlay
}

export default {
  install: (app) => {
    Object.keys(moduleMap).forEach((key) => {
      app.component(moduleMap[key].name, moduleMap[key])
    })
  }
}