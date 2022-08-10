import Component from "./Component.svelte"
import Schema from "../schema.json"

if (window) {
  if (!window["##BUDIBASE_CUSTOM_COMPONENTS##"]) {
    window["##BUDIBASE_CUSTOM_COMPONENTS##"] = []
  }
  window["##BUDIBASE_CUSTOM_COMPONENTS##"].push({ Component, Schema })
}

export { Component, Schema }
