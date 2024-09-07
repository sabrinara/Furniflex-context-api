import { createBrowserRouter } from 'react-router-dom';
import Root from '../Layouts/Root';
import ErrorPage from '../Layouts/ErrorPage';
import Home from '../Pages/Home';
import Login from '../Components/Auth/Login';
import SignUp from '../Components/Auth/SignUp';
import Store from '../Components/Store/Store';

const router = createBrowserRouter([
    {
        path: "/",
        element:<Store></Store>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>,

            }
        ]
    },
    {
        path:"/login",
        element:<Login></Login>
    },
    {
        path:"/signup",
        element:<SignUp></SignUp>
    }

]);

export default router;