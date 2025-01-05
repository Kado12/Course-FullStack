import { useState } from "react"

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      {props.parts.map(
        part => <Part key={part.name} name={part.name} exercises={part.exercises} />
      )}
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>{props.name} {props.exercises}</p>
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    </>
  )
}



const Hello = (props) => {
  const bornYear = () => {
    const yearNow = new Date().getFullYear()
    return yearNow - props.age
  }

  return (
    <>
      <div>
        <p>Hola {props.name}, tu tienes {props.age} años</p>
        <p>Entonces probablemente naciste en {bornYear()}</p>
      </div>
    </>
  )
}


const Display = (props) => {
  return (
    <div>{props.counter}</div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}



const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const name = 'Peter'
  const age = 31

  const [counter, setCounter] = useState(0)
  // setTimeout(
  //   () => setCounter(counter + 1), 1000
  // )
  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)

  // const people = {
  //   name: 'Gonzalo Sotelo',
  //   age: 23,
  //   hobby: 'Programmer',
  //   greet: function () {
  //     console.log(`Hello, my name is ${this.name}`)
  //   }
  // }

  // people.greet()

  // people.growOlder = function () {
  //   this.age += 1
  // }

  // console.log(people.age)
  // people.growOlder()
  // console.log(people.age)

  // class Person {
  //   constructor(name, age) {
  //     this.name = name,
  //       this.age = age
  //   }
  //   greet() {
  //     console.log(`Hello, my name is ${this.name}`)
  //   }
  // }

  // const person1 = new Person('Adam Ochoa', 29)
  // person1.greet()

  // const person2 = new Person('Hans Becker', 23)
  // person2.greet()


  return (
    <>
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
        <Hello name='Gonzalo' age={16 + 7} />
        <Hello name={name} age={age} />
        <Display counter={counter} />
        <Button
          onClick={increaseByOne}
          text='plus'
        />
        <Button
          onClick={setToZero}
          text='zero'
        />
        <Button
          onClick={decreaseByOne}
          text='minus'
        />
      </div>
    </>
  )
}

export default App
