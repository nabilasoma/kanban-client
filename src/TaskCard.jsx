
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const TaskCard = ({task, _id}) => {

    const handleDelete= (_id) => {
        console.log(_id);

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
           


            fetch(`https://kanban-server-nabilasoma.vercel.app/kanbanUsers/${_id}`, {
                method: "DELETE",
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.deletedCount > 0){
                  Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
               )
                }
            })
            }
          })
    }

    
    return (
        <div className="bg-white p-2 my-2 shadow-md rounded-md">
        <h3 className="text-lg text-red-800 font-semibold"><span className='font-bold text-green-500'>Title: </span>{task.title}</h3>
        <p className="text-gray-600"><span className='font-bold'>Description</span>:
         {task.description}</p>
        <div className="mt-2">
         <Link to={`/update/${_id}`}>
         <button className="mr-2 px-6 py-1 rounded-md font-bold bg-green-700 text-white">Edit</button>
         </Link>
          <button onClick={() => handleDelete(_id)} className="bg-red-600 text-white font-bold rounded-md px-6 py-1 ">Delete</button>
        </div>
      </div>
    );
};

export default TaskCard;