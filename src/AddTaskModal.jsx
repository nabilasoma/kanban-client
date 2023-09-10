import { useForm } from "react-hook-form";
import MyModal from "./MyModal";
import Swal from "sweetalert2";


const AddTaskModal = ({isOpen, setIsOpen}) => {
    const {register, handleSubmit, reset} = useForm();

    const onSubmit = (data) => {
        console.log(data);

        fetch('http://localhost:5000/kanbanUsers', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.insertedId){
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your Task has been saved',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  reset();
            }
        })
    }

    return (
        <div>
             <MyModal isOpen={isOpen} setIsOpen={setIsOpen} 
             title='Kanban Application'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-3">
                <label htmlFor="Title">Title</label>
                <input className="w-full rounded-md" type="text" {...register ('title')} />
                </div>
                <div className="flex flex-col gap-3">
                <label htmlFor="Title">Status</label>
                <input className="w-full rounded-md" type="text" {...register ('status')} />
                </div>
                <div className="flex flex-col gap-3 mt-4">
                <label htmlFor="title">Description</label>
                <input className="w-full p-6 rounded-md" type='text' {...register('description')}/>
               </div>
               <div className="flex gap-4">
                <button className="py-2 rounded-md px-6 bg-green-800 text-white font-bold mt-2" type='submit'>Submit</button>
                </div>
            </form>
      </MyModal>
        </div>
    );
};

export default AddTaskModal;