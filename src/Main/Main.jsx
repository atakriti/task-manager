import React, { useContext, useState } from 'react'
import { context } from '../ContextFun'
import "./main.scss"
function Main() {
   /* for using useRef in input:
  1- let value = useRef()
  2- in input we give ref={value}
  3- in handleSubmit value.current.value, we see the value
  4- ------- WE DON'T NEED ONCHANGE --------
   */ 
    let { task, setTask } = useContext(context)
    let [taskValue, setTaskValue] = useState({
        title: "",
        task: "",
        priority: "",
        privity: "",
        isCompleted:false
    })
    let handleChange = (e) => {
        setTaskValue({...taskValue,[e.target.name]:e.target.value})
    }
  return (
      <div className='main'>
          <div className="main_container">
              <h1>Welcome to my <span>Task Manager</span></h1>
              {/* ==================== Filters ======================== */}
              <select name="" id="">
                  <option selected disabled value="">Select priority</option>
                  <option value="work">Work</option>
                  <option value="private">Private</option>
              </select>
              <select name="" id="">
                  <option selected disabled value="">Select Privity</option>
                  <option value="high">High</option>
                  <option value="low">Low</option>
              </select>
              <select name="" id="">
                  <option selected disabled value="">Select Completed</option>
                  <option value="completed">Completed</option>
                  <option value="not">Not yet</option>
              </select>
              {/* ============================= Form ===================== */}
              <form action="">
              <input className='titleInput' type="text" name='title' id="" defaultValue={`Task ${task.length + 1}`} />
                  <input type="text" name='task' id="" placeholder='Enter your task...' />
                  <button>Add</button>
              </form>
              {/* ============================ Tasks =================== */}


          </div>
      </div>
  )
}

export default Main