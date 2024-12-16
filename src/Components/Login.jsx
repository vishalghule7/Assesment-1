import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Joi from "joi";
import Captcha from "./Captcha";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    captcha: "",
  });

  const [generatedCaptcha, setGeneratedCaptcha] = useState(Captcha);

  const formSchema = Joi.object({
    username: Joi.string().required().messages({
      "string.empty": "Username is required!",
    }),

    password: Joi.string().required().messages({
      "string.empty": "Password is required!",
    }),

    captcha: Joi.string().required().valid(generatedCaptcha).messages({
      "string.empty": "Captcha is required!",
      "any.only": "Captcha is incorrect",
    }),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const refreshCaptcha = (e) => {
    e.preventDefault();
    setGeneratedCaptcha(Captcha);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { error } = formSchema.validate(formData, { abortEarly: true });
    if (error) {
      error.details.forEach((err) => toast.error(err.message));
      return;
    }

    toast.success("Login Successful");
    console.log("Form data", formData);
    setFormData({
      username: "",
      password: "",
      captcha: "",
    });
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="p-5 w-full max-w-xs sm:min-w-[400px] sm:px-6 md:min-w-[450px] md:px-8 lg:max-w-xl bg-gray-700 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 transition-all ease-linear hover:shadow-md duration-400 hover:shadow-slate-950">
        <h3 className="font-serif font-bold text-center text-gray-200 text-xl md:text-2xl lg:text-2xl">
          Login
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label p-2 cursor-pointer">
              <span className="text-sm md:text-base label-text">Username</span>
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              placeholder="Enter username"
              className="w-full input input-bordered h-10 text-sm md:text-base"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="label p-2 cursor-pointer">
              <span className="text-sm md:text-base label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Enter Password"
              className="w-full input input-bordered h-10 text-sm md:text-base"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="label p-2 cursor-pointer">
              <div className="flex flex-row justify-center items-center ">
                <div className="text-sm md:text-base label-text mr-20 sm:mr-28">
                  Captcha
                </div>
                <div className="font-serif font-semibold p-1 rounded-l border-gray-800">
                  {generatedCaptcha}
                </div>
              </div>
            </label>
            <div className="flex flex-row justify-center gap-x-2 items-center">
              <button
                onClick={refreshCaptcha}
                className="text-sm md:text-base border-2 border-gray-500 text-gray-400 rounded-md h-10 px-3 leading-none focus:outline-none hover:text-black hover:bg-gray-400 transition-all duration-150 ease-linear "
              >
                Refresh
              </button>
              <input
                type="text"
                name="captcha"
                value={formData.captcha}
                placeholder="Enter captcha"
                className="w-full input input-bordered h-10 text-sm md:text-base"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <Link
            to="/signup"
            className="text-sm hover:underline hover:text-blue-600 mt-4 inline-block"
          >
            Don't have an account?
          </Link>
          <div>
            <button
              type="submit"
              className="btn btn-block btn-sm  mb-4  hover:border-gray-950 text-sm md:text-base"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
