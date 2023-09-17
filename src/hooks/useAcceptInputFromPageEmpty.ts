import { useState } from 'react'

export function useAcceptInputFromPageEmpty() {
  const [checkboxState, setCheckboxState] = useState<string | boolean>('')
  return { checkboxState, setCheckboxState }
}
