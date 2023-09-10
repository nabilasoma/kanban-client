import { useEffect, useState } from 'react'
import './App.css'
import TaskCard from './TaskCard'
import AddTaskModal from './AddTaskModal'

function App() {
  const [tasks, setTasks] = useState([])
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch('https://kanban-server-nabilasoma.vercel.app/kanbanUsers')
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setTasks(data);
    })
  },[])

  return (
   <div>
     <div>
     <h2 className='text-2xl font-bold text-green-700'>Kanban Application</h2>
    </div>
    <div>
  
      <button onClick={()=>setIsOpen(!isOpen)} className='mt-4 rounded-md px-6 py-2 bg-green-700 text-white font-bold'>Add Task</button>
     <AddTaskModal isOpen={isOpen} setIsOpen={setIsOpen}/>
    </div>

   
   <div className="flex justify-center p-8 space-x-4">
      <div className="w-1/3">
        <div className="bg-blue-200 p-4">
          <h2 className="text-lg font-semibold">To Do</h2>
          {tasks
            .filter((task) => task.status === 'ToDo')
            .map((task) => (
              <TaskCard key={task.id} task={task}
               isOpen={isOpen}
               setIsOpen={setIsOpen}
               />
            ))}
        </div>
      </div>
      <div className="w-1/3">
        <div className="bg-yellow-200 p-4">
          <h2 className="text-lg font-semibold">Doing</h2>
          {tasks
            .filter((task) => task.status === 'Doing')
            .map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
        </div>
      </div>
      <div className="w-1/3">
        <div className="bg-green-200 p-4">
          <h2 className="text-lg font-semibold">Done</h2>
          {tasks
            .filter((task) => task.status === 'Done')
            .map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
        </div>
      </div>
    </div>
   </div>
  )
}

export default App
