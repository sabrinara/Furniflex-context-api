import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../Layouts/ErrorPage';
import Home from '../Pages/Home';
import Login from '../Components/Auth/Login';
import SignUp from '../Components/Auth/SignUp';
import Store from '../Components/Store/Store';
import Root from '../Layouts/Root';
import Cart from '../Components/Cart/Cart';

const router = createBrowserRouter([
    {
        path: "/",
        element:<Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>,

            },
            {
                path: "/cart",
                element: <Cart></Cart>
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