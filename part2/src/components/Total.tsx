type TotalProps = {
  parts: {
    id: number
    name: string
    exercises: number
  }[]
}

const Total = ({ parts }: TotalProps) => {
  return (
    <>
      <p>
        Number of exercises {parts.reduce((sum, part) => sum + part.exercises, 0)}
      </p>
    </>
  )
}

export default Total