import React, { useContext, useEffect, useState } from "react";
import { context } from "../ContextFun";
import { CiCircleMore } from "react-icons/ci";
import {FcAndroidOs} from "react-icons/fc"
import FlipMove from 'react-flip-move';
import android from "../app.apk"
import "./main.scss";
function Main() {
  /* for using useRef in input:
  1- let value = useRef()
  2- in input we give ref={value}
  3- in handleSubmit value.current.value, we see the value
  4- ------- WE DON'T NEED ONCHANGE --------
   */
  let { task, setTask } = useContext(context);
  let [modal,setModal] = useState({index:null,isModal:false})
  let [isEditing, setIsEditing] = useState({ index: null, isEditing: false })
  let [taskValue, setTaskValue] = useState({
    title: `Task ${task.length + 1}`,
    task: "",
    priority: "",
    privity: "",
    isCompleted: false,
  });
  let handleChange = (e) => {
    setTaskValue({ ...taskValue, [e.target.name]: e.target.value });
  };
  let handleSubmit = (e) => {
      e.preventDefault();
      if (isEditing.isEditing) {
          let editing = task.map((item, i) => i === isEditing.index ? {title: taskValue.title, task: taskValue.task } : item)
          setTask(editing)
          setIsEditing({index:null,isEditing:false})
          setTaskValue({
            title: `Task ${task.length + 1}`,
            task: "",
            priority: "",
            privity: "",
            isCompleted: false,
          });
          //! return here is important to Don't create another task
          return;
      }
    setTask([...task, taskValue]);
    setTaskValue({
      title: `Task ${task.length + 1}`,
      task: "",
      priority: "",
      privity: "",
      isCompleted: false,
    });
  };
    console.log("This is the tasks",task);
    // ============================== Delete ==================
    let handleDelete = (i) => {
        let filter = task.filter((item, index) => index !== i)
        setTask(filter)
    }
    // ============================ Done =================
    let handleDone = (item,i) => {
        if (task.some((item, index) => index === i)) {
            let coloring = task.map((item, ind) => ind === i ? { ...item, isCompleted: !item.isCompleted } : item)
            setTask(coloring)
        }
        return item
    }
    // ============================ Edit ==================
    let handleEdit = (p,i) => {
        setIsEditing({ index: i, isEditing: true })
        // SetTaskValue here is when edit btn clicked , the field of adding task will be focused 
        setTaskValue({...taskValue,title:p.title,task:p.task})
    }
// ==================================== Priority & Privity & Completed ===================
  let handleChangeFilter = (i, type, category) => {
    let filter = task.map((item, index) => index === i ? { ...item, [category]: type } : item)
    setTask(filter)
    }
  // ========================================== Filtering ======================
  let [priorValue,setPriorValue] = useState("all")
  let [privityValue,setPrivityValue] = useState("all")
  let [isCompletedValue,setIsCompletedValue] = useState("all")
  
  let filteredTasks = task.filter(item => {
    if (priorValue === "all") {
      return true
    }
    return item.priority.includes(priorValue)
 }).filter(item => {
  if (privityValue === "all") {
    return true
  }
  return item.privity.includes(privityValue)
 }).filter(item => {
   if (isCompletedValue === "all") {
     return true; // show all tasks
   }
   return item.isCompleted === (isCompletedValue === "true");
  
 })
// ===================================================== handleModal =======================
  let handleModal = (i) => {
    setModal({index:i,isModal:true})
    
  }
  

// =====================================================
useEffect(() => {
  setTaskValue({
    title: `Task ${task.length + 1}`,
    task: "",
    priority: "",
    privity: "",
    isCompleted: false,
  })
},[task])
//! Important the option in select if the option is boolean so the option always returns it as STRING

  return (
    <div className="main">
      <div className="main_container">
        <h1>
          Welcome to my <span>Task Manager</span>
        </h1>
        {/* ==================== Filters ======================== */}
        <select name="" id="" onChange={(e) => setPriorValue(e.target.value)}>
          <option  selected disabled >
            Select priority
          </option>
          <option value="all">All</option>
          <option value="work">Work</option>
          <option value="private">Private</option>
        </select>
        {/* =============================== */}
        <select name="" id="" onChange={(e) => setPrivityValue(e.target.value)}>
          <option selected disabled>
            Select Privity
          </option>
          <option value="all">All</option>
          <option value="high">High</option>
          <option value="low">Low</option>
        </select>
        {/* ================================= */}
        <select name="" id="" onChange={(e) => setIsCompletedValue(e.target.value)}>
          <option selected disabled  >
            Select Completed
          </option>
          <option value="all">All</option>
          <option value={"true"}>Completed</option>
          <option value={"false"}>Not yet</option>
        </select>
        {/* ============================= Form ===================== */}
        <form onChange={handleChange} onSubmit={handleSubmit}>
          <input
            className="titleInput"
            type="text"
            name="title"
            id=""
            value={taskValue.title}
            required
          />
          <input
            type="text"
            name="task"
            id=""
            placeholder="Enter your task..."
            value={taskValue.task}
            required
                  />
                  {isEditing.isEditing ? (
          <button>Edit</button>
                  ): (
          <button>Add</button>
                  )}
        </form>
        {/* ============================ Tasks =================== */}
        <ul>
          <FlipMove>
          {filteredTasks.map((single, i) => (
            <li style={{background:`${single.isCompleted ? "#d6ffd6" : "white"}`}}>
              <span>
                <b>Title:</b> {single.title}
              </span>
              <span>
                <b>Task:</b> {single.task}
              </span>
              <div className="btns">
                <button onClick={() => handleDone(single,i)}>Done</button>
                <button onClick={() => handleDelete(i)}>Delete</button>
                <button onClick={() => handleEdit(single,i)}>Edit</button>
                <CiCircleMore onClick={() => handleModal(i)} />
              </div>
              {modal.index === i && modal.isModal && (
                 <div className="options">
                 <div className="option_container">
                    {/* ========================= Priority ================= */}
                <h1>Select the <span>category:</span></h1>
                   <h4>Priority:</h4>
                 <label htmlFor={`priority${i}`}>
                   <h5>Work</h5>
                   <input type="radio" name={`priority${i}`}id={`priority${i}`}value="work" checked={single.priority === "work"} onChange={() => handleChangeFilter(i,"work","priority")}/>
                 </label>
                 <label htmlFor={`priority${i + 1}`}>
                   <h5>Private</h5>
                   <input type="radio" name={`priority${i + 1}`}id={`priority${i + 1}`}value="private" checked={single.priority === "private"} onChange={() => handleChangeFilter(i,"private","priority")} />
                 </label>
                 {/* ============================= Privity =============== */}
                 <h4>Privity:</h4>
                 <label htmlFor={`privity${i}`}>
                   <h5>High</h5>
                   <input type="radio" name={`privity${i}`} id={`privity${i}`} checked={single.privity === "high"} onChange={() => handleChangeFilter(i,"high","privity")} />
                 </label>
                 <label htmlFor={`privity${i + 1}`}>
                   <h5>Low</h5>
                   <input type="radio" name={`privity${i + 1}`} id={`privity${i + 1}`} checked={single.privity === "low"} onChange={() => handleChangeFilter(i,"low","privity")} />
                 </label>
                 {/* ============================= Completed =============== */}
                 <h4>Completed:</h4>
                 <label htmlFor={`isCompleted${i}`}>
                   <h5>Completed</h5>
                   <input type="radio" name={`isCompleted${i}`} id={`isCompleted${i}`} checked={single.isCompleted === true} onChange={() => handleChangeFilter(i,true,"isCompleted")} />
                 </label>
                 <label htmlFor={`isCompleted${i + 1}`}>
                   <h5>Not yet</h5>
                   <input type="radio" name={`isCompleted${i + 1}`} id={`isCompleted${i + 1}`} checked={single.isCompleted === false} onChange={() => handleChangeFilter(i,false,"isCompleted")}/>
                   </label>
                   <button onClick={() => setModal({...modal,isModal:false})}>Finish</button>
                </div>
               </div>
             )}
            </li>
          ))}
            </FlipMove>
        </ul>
      </div>
      <footer>
        <h3>Developed by Anwar | Android App <a href={android} download={android}> <FcAndroidOs/></a></h3>
      </footer>
    </div>
  );
}


export default Main;
