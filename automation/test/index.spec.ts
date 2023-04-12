import automation from "../src"
import { describe, it, expect } from "@jest/globals"
import { EventEmitter } from "events"

describe("test the automation action", () => {
  it("should be able to run automation step", async () => {
    const response = await automation.action({
      inputs: {
        text: "hello",
      },
      emitter: new EventEmitter(),
      context: {},
      appId: "test",
    })
    expect(response.success).toBe(true)
  })
})

describe("test the automation schema", () => {
  it("should provide the schema", () => {
    expect(automation.schema.type).toBe("automation")
    expect(automation.schema.schema.stepId).toBeDefined()
  })
})

