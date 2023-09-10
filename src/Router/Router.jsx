import { createBrowserRouter } from "react-router-dom";
import UpdateTask from "../UpdateTask";
import App from "../App";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App></App>
    },
    
       {
        path: 'update/:id',
        element: <UpdateTask />
       
       }
    
]);

export default router;