import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../Context/AuthProvider";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { signIn, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();


    const handleLogin = (e) => {
        e.preventDefault();
        console.log(e.currentTarget);
        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const password = form.get('password');
        console.log(email, password);


        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast('Successfully Login');
                navigate('/')
            })
            .catch(error => {
                console.error(error);
                toast('Login failed. Please check your email and password.');
            });
    }
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then((result) => {
                console.log(result.user)
                toast('Successfully Login');
                navigate('/')
            })
            .catch(error => {
                console.error(error);
                toast('Login failed. Please check your email and password.');
            });
    }
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div className="flex justify-center ">
            <div className="w-1/2">
                <div className="hero bg-white h-screen">
                    <div className="hero-content flex-col ">
                    <div className="flex flex-col justify-center items-center text-center">
                            <h1 className="text-2xl font-bold text-black">Welcom To</h1>
                            <h1 className="text-5xl text-black font-bold text-center">Furni<span className="text-sky-600">Flex</span></h1>
                            <p>Signup for purchase your desire products</p>
                        </div>
                        <div className="card flex-shrink-0 w-full md:w-[100rem] max-w-xl shadow-2xl ">
                            <form className="card-body" onSubmit={handleLogin}>
                            <div className="form-control  border px-3 mr-4 ">
                                    <label className="label">
                                        <span className="label-text text-lg">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        className=" rounded-none bg-white"
                                        required
                                    />
                                </div>
                                <div className="form-control  border px-3 mr-4 relative">
                                    <label className="label">
                                        <span className="label-text text-lg">Password</span>
                                    </label>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        className="rounded-none bg-white"
                                        required
                                    />

                                    <span className="absolute right-8 bottom-6 cursor-pointer" onClick={togglePasswordVisibility}>
                                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                                    </span>
                                </div>
                                <div className="form-control mt-1">
                                    <button className="p-3 bg-black text-white rounded-none mr-4">Login</button>
                                </div>

                            </form>

                            <div className="flex flex-col items-center justify-center mb-6">
                                <h1 className="text-lg mb-2">or</h1>
                                <div className="flex justify-center items-center border py-2 px-4
                                 gap-2 " onClick={handleGoogleSignIn}>
                                    <FcGoogle />
                                    <button className="p-1 text-black font-bold">Google</button>
                                </div>
                                <h1 className="mt-6">Don&apos;t have an account? <Link to="/signup" className="text-blue-600">Sign Up</Link></h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-1/2 relative">
                <img src="./hero-banner.png" className="h-screen w-full" alt="" />
                <div className="flex flex-col justify-center items-center text-center mb-4 absolute bottom-40 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <img src="./logo.png" className="h-24 w-28" alt="" />
                    <h1 className="text-sm text-white">Discover a seamless shopping experience with our curated collection of products. From fashion to electronics, we bring quality.</h1>
                </div>
            </div>
            <ToastContainer position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored" />
        </div>
    );
};

export default Login;