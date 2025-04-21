import Part from "./Part"

type ContentProps = {
  parts: {
    id: number
    name: string
    exercises: number
  }[]
}

const Content = ({ parts }: ContentProps) => {
  return (
    <>
      <ul>
        {
          parts.map(part => {
            return (
              <Part key={part.id} part={part} />
            )
          })
        }
      </ul>
    </>
  )
}

export default Content