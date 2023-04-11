import { AutomationStepInput } from "@budibase/types"

export default async function run({ inputs }: AutomationStepInput) {
  const message = `Custom automation logger - ${inputs.text}`
  console.log(message)
  return {
    success: true,
    message,
  }
}

