import React from 'react'

const Header = (props) => {
    console.log(props)
    return (
      <div>
        <h1>
          {props.course}
        </h1>
      </div>
    )
  }
  
  const Part = (props) => {
    return (
      <div>
        <p>
          {props.part} {props.exercises}
        </p>
      </div>
    )
  }
  
  const Content = (props) => {
    return (
      <div>
        {
          
          props.parts.map(part =>
            <Part key= {part.id} part={part.name} exercises={part.exercises}/>)
        }
        
        {/* <Part part={props.part1} exercise={props.exercises1}/>
        <Part part={props.part2} exercise={props.exercises2}/>
        <Part part={props.part3} exercise={props.exercises3}/> */}
      </div>
    )
  }
  
  const Total = (props) => {
    const total = props.parts.reduce((s, p) => console.log('what is happening', s, p) || s + p.exercises,0) /*re-check this part!!!*/
    return (
      <div>
        <p>
        Number of exercises {total}
        </p>
      </div>
    )
  }
  
  const Course = (props) => {
    const course = props.course
    return (
      <div>
        <Header course={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>     
      </div>
    )
  
  }

  export default Course