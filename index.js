/**
 * @format
 */

import { AppRegistry } from "react-native"
import App from "./App"
import { name as appName } from "./app.json"
import "./i18n"

AppRegistry.registerComponent(appName, () => App)

if (window.document) {
  AppRegistry.runApplication(appName, {
    rootTag: document.getElementById("root")
  })
}
