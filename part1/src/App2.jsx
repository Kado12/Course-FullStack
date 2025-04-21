import { useState } from "react"
import History from "./History"
import Button from "./Button"

const App2 = () => {

  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)

  const [clicks, setClicks] = useState({
    left: 0,
    right: 0
  })
  const [allClicks, setAllClicks] = useState([])
  const [total, setTotal] = useState(0)

  const handleLeftClick = () => {
    const newClicks = { ...clicks, left: clicks.left + 1 }
    setClicks(newClicks)
    setAllClicks(allClicks.concat('L'))
    setTotal(total + 1)
  }

  const handleRightClick = () => {
    const newClicks = { ...clicks, right: clicks.right + 1 }
    setClicks(newClicks)
    setAllClicks(allClicks.concat('R'))
    setTotal(total + 1)
  }

  const handleZeroClick = () => {
    const newClicks = { left: 0, right: 0 }
    setClicks(newClicks)
    setAllClicks([])
    setTotal(0)
  }

  // * Usar <Button handleClick={handleLeftClick} text='LEFT' /> cuando no halla argumento para pasar
  // ? Usar <Button handleClick={() => handleLeftClick()} text='LEFT' /> cuando halla argumento para pasar

  return (
    <div>
      {left}
      <button onClick={() => setLeft(left + 1)}>LEFT</button>
      <button onClick={() => { setLeft(0), setRight(0) }}>ZERO</button>
      <button onClick={() => setRight(right + 1)}>RIGHT</button>
      {right}
      <hr />
      {clicks.left}
      <Button handleClick={handleLeftClick} text='LEFT' />
      <Button handleClick={handleZeroClick} text='ZERO' />
      <Button handleClick={handleRightClick} text='RIGHT' />
      {clicks.right}
      <History allClicks={allClicks} total={total} />
    </div>
  )
}

export default App2