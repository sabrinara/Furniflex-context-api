import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";  // Import eye icons
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../Context/AuthProvider";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
    const { createUser, googleSignIn, handleUpdateProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const firstName = form.get('firstName');
        const lastName = form.get('lastName');
        const fullName = `${firstName} ${lastName}`;
        // const photo = form.get('photo');
        const email = form.get('email');
        const password = form.get('password');
        const accepted = e.target.terms.checked;

        try {
            if (password.length < 6) {
                throw new Error('Password must be at least 6 characters or longer');
            } else if (!/[A-Z]/.test(password)) {
                throw new Error('Password must contain at least one uppercase letter');
            } else if (!/^(?=.*[A-Z])(?=.*\W).*$/g.test(password)) {
                throw new Error('Password must contain at least one special character');
            } else if (!accepted) {
                throw new Error('You must accept our terms and conditions');
            }

            await createUser(email, password);
            await handleUpdateProfile(fullName);

            toast.success('Successfully Sign up');
            navigate('/');
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleGoogleSignUp = () => {
        googleSignIn()
            .then((result) => {
                console.log(result.user);
                toast('Successfully Logged in');
                navigate('/');
            })
            .catch(error => {
                console.error(error);
                toast('Login failed. Please check your email and password.');
            });
    };


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex justify-center ">
            <div className="w-1/2">
                <div className="hero bg-white h-screen">
                    <div className="hero-content flex-col my-10">
                        <div className="flex flex-col justify-center items-center text-center">
                            <h1 className="text-2xl font-bold text-black">Welcom To</h1>
                            <h1 className="text-5xl text-black font-bold text-center">Furni<span className="text-sky-600">Flex</span></h1>
                            <p>Signup for purchase your desire products</p>
                        </div>
                        <div className="flex flex-col justify-center w-full md:w-[80rem] max-w-xl shadow-2xl ">
                            <form className="flex flex-col mx-8 mt-4 justify-center gap-2 " onSubmit={handleRegister}>

                                < div className="flex justify-between mr-4">
                                    <div className="form-control border px-3">
                                        <label className="label ">
                                            <span className="label-text text-lg">First Name</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            className=" px-4 rounded-none bg-white"
                                            required
                                        />
                                    </div>


                                    <div className="form-control border px-3 ">
                                        <label className="label ">
                                            <span className="label-text text-lg">Last Name</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            className="px-4  rounded-none bg-white"
                                            required
                                        />
                                    </div>
                                </div>


                                {/* <div className="form-control  border px-3 mr-4 ">
                                    <label className="label">
                                        <span className="label-text text-lg">Profile Picture(add a photo url)</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="photo"
                                        className=" rounded-none bg-white"
                                        required
                                    />
                                </div> */}


                                <div className="form-control  border px-3 mr-4 ">
                                    <label className="label">
                                        <span className=" label-text text-lg">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                      
                                        className="  rounded-none bg-white"
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
                                        className=" rounded-none bg-white"
                                        required
                                    />

                                    <span className="absolute right-8 bottom-6 cursor-pointer" onClick={togglePasswordVisibility}>
                                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                                    </span>
                                </div>


                                <div className="mb-1 text-black">
                                    <input type="checkbox" name="terms" id="terms" />
                                    <label className="ml-2" htmlFor="terms">
                                        Accept Our <a href="">Terms and Conditions</a>
                                    </label>
                                </div>


                                <div className="form-control">
                                    <button className="p-3 bg-black text-white rounded-none mr-4">Sign Up</button>
                                </div>
                            </form>


                            <div className="flex flex-col items-center justify-center ">
                            <h1 className="text-lg mt-2">or</h1>
                                <div className="flex justify-center items-center border py-2 px-4
                                 gap-2 mb-2" onClick={handleGoogleSignUp}>
                                    <FcGoogle />
                                    <button className="p-1 text-black font-bold">Google</button>
                                </div>
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
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    );
};

export default Register;
