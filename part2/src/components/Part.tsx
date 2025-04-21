type PartProps = {
  part: {
    id: number
    name: string
    exercises: number
  }
}

const Part = ({ part }: PartProps) => {
  return (
    <>
      <li>
        {part.name} {part.exercises}
      </li>
    </>
  )
}

export default Part