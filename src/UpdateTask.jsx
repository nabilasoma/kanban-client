
import { useEffect, useState } from "react";
import Swal from "sweetalert2";


const UpdateTask = () => {

    const [tasks, setTasks] = useState([]);
  
   
    useEffect(()=> {
        fetch('https://kanban-server-nabilasoma.vercel.app/kanbanUsers/')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setTasks(data)
        })
    }, []);

    const {_id, title, description} = tasks;

    console.log("line 27",tasks);
 


    const handleUpdatedTask = (event, _id) => {
        event.preventDefault();

        const form = event.target;

        const title = form.title.value;
        const description = form.description.value;


        const updateTask = {title, description};
        console.log(updateTask);

        // send data to the server
        fetch(`https://kanban-server-nabilasoma.vercel.app/kanbanUsers/${_id}`,{
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateTask)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.modifiedCount > 0){
                Swal.fire({
                    title: 'Success',
                    text: 'Successfully saved',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                  })
            }
        })


    };


    return (
        <div className='text-center m-auto'>
            <h3 className='text-center text-success font-bold mt-2 mb-4'>Update Your Task</h3>
            <form onSubmit={()=> handleUpdatedTask(_id)}>
                <div className='w-50 m-auto mt-4 text-center'>
                    <label className="font-bold">Title</label>
                    <div className="input-group input-group-lg mb-3 border rounded border-danger">
                        <input type="text" name="title" defaultValue={title} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                    </div>
                    <label className="font-bold">Description</label>
                    <div className="input-group input-group-lg border rounded border-danger">
                    
                        <textarea type="text" name="description" defaultValue={description} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                    </div>
                    <input type="submit" className="mt-2 px-6 py-1 bg-green-600 text-center btn btn-success" />
                </div>
            </form>
        </div>
    );
};

export default UpdateTask;