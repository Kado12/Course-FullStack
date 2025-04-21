import { useState } from "react"

import Button from "./Button"
import Statistics from "./Statistics"

const Feedback = () => {

  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  })

  const handleGoodClick = () => {
    setFeedback({ ...feedback, good: feedback.good + 1 })
  }

  const handleNeutralClick = () => {
    setFeedback({ ...feedback, neutral: feedback.neutral + 1 })
  }

  const handleBadClick = () => {
    setFeedback({ ...feedback, bad: feedback.bad + 1 })
  }

  return (
    <>
      <h1>Give Feedback</h1>
      <Button handleClick={handleGoodClick} text='Good' />
      <Button handleClick={handleNeutralClick} text='Neutral' />
      <Button handleClick={handleBadClick} text='Bad' />
      <Statistics feedback={feedback} />
    </>
  )
}

export default Feedback