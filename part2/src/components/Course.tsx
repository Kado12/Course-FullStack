import Header from "./Header"
import Content from "./Content"
import Total from "./Total"

type CourseProps = {
  course: {
    name: string
    parts: {
      id: number
      name: string
      exercises: number
    }[]
  }
}

const Course = ({ course }: CourseProps) => {
  return (
    <>
      <div>
        <Header title={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    </>
  )
}

export default Course