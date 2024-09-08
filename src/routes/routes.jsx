import { createBrowserRouter } from 'react-router-dom';
import Home from '../Pages/Home';
import Login from '../Components/Auth/Login';
import SignUp from '../Components/Auth/SignUp';
import Root from '../Layouts/Root';
import Cart from '../Components/Cart/Cart';
import NotFound from '../Layouts/NotFound';

const router = createBrowserRouter([
    {
        path: "/",
        element:<Root></Root>,
        errorElement: <NotFound></NotFound>,
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