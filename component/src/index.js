import Component from "./Component.svelte"
import schema from "../schema.json.hbs"

if (window) {
  if (!window["##BUDIBASE_CUSTOM_COMPONENTS##"]) {
    window["##BUDIBASE_CUSTOM_COMPONENTS##"] = []
  }
  window["##BUDIBASE_CUSTOM_COMPONENTS##"].push({ Component, schema })
}

export { Component, schema }
