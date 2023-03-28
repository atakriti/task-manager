import React, { useContext, useState } from 'react'
import { context } from '../ContextFun'
import {CiCircleMore} from "react-icons/ci"
import "./main.scss"
function Main() {
   /* for using useRef in input:
  1- let value = useRef()
  2- in input we give ref={value}
  3- in handleSubmit value.current.value, we see the value
  4- ------- WE DON'T NEED ONCHANGE --------
   */ 
    let { task, setTask } = useContext(context)
    console.log("🚀 ~ file: Main.jsx:12 ~ Main ~ task:", task)
    let [taskValue, setTaskValue] = useState({
        title: `Task ${task.length + 1}`,
        task: "",
        priority: "",
        privity: "",
        isCompleted:false
    })
    console.log("🚀 ~ file: Main.jsx:19 ~ Main ~ taskValue:", taskValue)
    let handleChange = (e) => {
        setTaskValue({...taskValue,[e.target.name]:e.target.value})
    }
    let handleSubmit = (e) => {
        e.preventDefault()
        setTask([...task, taskValue])
        setTaskValue({
            title: `Task ${task.length + 1}`,
            task: "",
            priority: "",
            privity: "",
            isCompleted:false
        })
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
              <form onChange={handleChange} onSubmit={handleSubmit}>
              <input className='titleInput' type="text" name='title' id="" value={taskValue.title} />
                  <input type="text" name='task' id="" placeholder='Enter your task...' value={taskValue.task} />
                  <button>Add</button>
              </form>
              {/* ============================ Tasks =================== */}
              <ul>
                  
                  {task.map((single, i) => <li>
                      <span>Title: {single.title}</span>
                      <span>Task: {single.task}</span>
                      <div className="btns">
                          <button>Done</button>
                          <button>Delete</button>
                          <button>Edit</button>
                            <CiCircleMore/>
                      </div>

                  </li>  )}
              </ul>

          </div>
      </div>
  )
}

export default Main