import { useEffect, useRef } from 'react'

/**
 * Makes the browser / phone Back button move a multi-step form to the
 * PREVIOUS step instead of leaving the page. The form is only exited
 * (normal back navigation) when the user is on step 1.
 *
 * Usage inside a form component:
 *   const [step, setStep] = useState(1)
 *   useStepBackButton(step, setStep)
 */
export default function useStepBackButton(step, setStep) {
  const prevStep = useRef(step)

  // When the user ADVANCES a step, push a history entry that the
  // Back button can consume on the way back.
  useEffect(() => {
    if (step > prevStep.current) {
      window.history.pushState({ formStep: step }, '')
    }
    prevStep.current = step
  }, [step])

  // On Back, drop down one step (clamped at 1). At step 1 we don't change
  // anything, so the browser performs the real back navigation and the
  // user leaves the form.
  useEffect(() => {
    const onPop = () => setStep(s => (s > 1 ? s - 1 : s))
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [setStep])
}
