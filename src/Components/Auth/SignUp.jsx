import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";  // Import eye icons
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../Context/AuthProvider";

const Register = () => {
    const { createUser, googleSignIn, handleUpdateProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    // State to toggle password visibility
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const firstName = form.get('firstName');
        const lastName = form.get('lastName');
        const fullName = `${firstName} ${lastName}`;
        const photo = form.get('photo');
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
            await handleUpdateProfile(fullName, photo);

            toast.success('Successfully Registered');
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
            })
            .catch(error => {
                console.error(error);
                toast('Login failed. Please check your email and password.');
            });
    };

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <div className="hero min-h-screen bg-base-200 mb-8">
                <div className="hero-content flex-col">
                    <div className="text-center mt-8 mb-4">
                        <h1 className="text-5xl font-bold text-cyan-800">Register now!</h1>
                    </div>
                    <div className="card flex-shrink-0 w-full md:w-[100rem] max-w-xl shadow-2xl bg-emerald-100">
                        <form className="card-body" onSubmit={handleRegister}>
                            {/* First Name Field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">First Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    className="input input-bordered"
                                    required
                                />
                            </div>

                            {/* Last Name Field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Last Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    className="input input-bordered"
                                    required
                                />
                            </div>

                            {/* Profile Picture Field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Profile Picture</span>
                                </label>
                                <input
                                    type="text"
                                    name="photo"
                                    placeholder="Photo URL"
                                    className="input input-bordered"
                                    required
                                />
                            </div>

                            {/* Email Field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Write Your Email"
                                    className="input input-bordered"
                                    required
                                />
                            </div>

                            {/* Password Field */}
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type={showPassword ? "text" : "password"}  // Toggle type between "password" and "text"
                                    name="password"
                                    placeholder="Write Your Password"
                                    className="input input-bordered"
                                    required
                                />
                                {/* Eye Icon to toggle password visibility */}
                                <span className="absolute right-4 bottom-4 cursor-pointer" onClick={togglePasswordVisibility}>
                                    {showPassword ?  <FaEye /> : <FaEyeSlash /> }
                                </span>
                            </div>

                            {/* Terms and Conditions */}
                            <div className="mb-2">
                                <input type="checkbox" name="terms" id="terms" />
                                <label className="ml-2" htmlFor="terms">
                                    Accept Our <a href="">Terms and Conditions</a>
                                </label>
                            </div>

                            {/* Register Button */}
                            <div className="form-control mt-1">
                                <button className="p-3 bg-blue-600 text-white rounded-md">Sign Up</button>
                            </div>
                        </form>

                        {/* Additional Options */}
                        <div className="flex flex-col items-center justify-center mb-6">
                            <p className="text-[15px]">
                                Already have an account? Please <Link to="/login"><button className="p-1 text-blue-700 font-bold">Login</button></Link>
                            </p>
                            <p>
                                Or sign up with <button onClick={handleGoogleSignUp} className="btn bg-emerald-100 text-blue-700 font-bold"><FaGoogle />Google</button>
                            </p>
                        </div>
                    </div>
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
