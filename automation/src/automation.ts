import { AutomationStepInputBase } from "@budibase/types"

export default async function run({
  inputs,
}: AutomationStepInputBase & { inputs: Record<string, any> }) {
  const message = `Custom automation logger - ${inputs.text}`
  console.log(message)
  return {
    success: true,
    message,
  }
}
