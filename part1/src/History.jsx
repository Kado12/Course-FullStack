
const History = (props) => {

  if (props.allClicks.length === 0) {
    return (
      <div>
        <p>Esta app está hecha para presionar los botones</p>
      </div>
    )
  }

  return (
    <div>
      <p>Historial de clicks: {props.allClicks.join(' ')}</p>
      <p>Total: {props.total}</p>
    </div>
  )
}

export default History