import StatisticLine from "./StatisticLine"

const Statistics = (props) => {

  if (props.feedback.good + props.feedback.neutral + props.feedback.bad === 0) {
    return (
      <div>
        <h3>Statistics</h3>
        <p>No se ha recopilado datos...</p>
      </div>
    )

  }

  return (
    <>
      <h3>Statistics</h3>
      <table>
        <thead>
          <tr>
            <th>Feedback</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <StatisticLine text='Good' value={props.feedback.good} />
          <StatisticLine text='Neutral' value={props.feedback.neutral} />
          <StatisticLine text='Bad' value={props.feedback.bad} />
          <StatisticLine text='Total' value={props.feedback.good + props.feedback.neutral + props.feedback.bad} />
          <StatisticLine text='Average' value={(props.feedback.good - props.feedback.bad) / (props.feedback.good + props.feedback.neutral + props.feedback.bad)} />
          <StatisticLine text='Positive' value={(props.feedback.good / (props.feedback.good + props.feedback.neutral + props.feedback.bad)) * 100} />
        </tbody>
      </table>
    </>
  )
}

export default Statistics