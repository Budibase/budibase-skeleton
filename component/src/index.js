import Component from "./Component.svelte"
import schema from "../schema.json"

if (window) {
  const plugin = { Component, schema }
  if (!window["##BUDIBASE_CUSTOM_COMPONENTS##"]) {
    window["##BUDIBASE_CUSTOM_COMPONENTS##"] = []
  }
  window["##BUDIBASE_CUSTOM_COMPONENTS##"].push(plugin)
  if (window.registerCustomComponent) {
    window.registerCustomComponent(plugin)
  }
}

export { Component, schema }
