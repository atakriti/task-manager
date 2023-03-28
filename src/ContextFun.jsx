import React, { createContext } from 'react'
import useLocalStorage from 'use-local-storage'
export let context = createContext()
function ContextFun({children}) {
    let [task, setTask] = useLocalStorage("taskManager",[])
    // ======================= Values ======================
    let Values = {
        task, setTask
    }
  return (
      <context.Provider value={Values}>{children}</context.Provider>
  )
}

export default ContextFun