import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import Joi from "joi";
import Captcha from "./Captcha";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    captcha: "",
  });
  const [passwordValid, setPasswordValid] = useState(false);
  const [generatedCaptcha, setGeneratedCaptcha] = useState(Captcha);

  const signupSchema = Joi.object({
    username: Joi.string().min(3).max(15).required().messages({
      "string.empty": "Username is required!",
      "string.min": "Username must be at least 3 characters!",
      "string.max": "Username cannot exceed 15 characters!",
    }),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.empty": "Email is required!",
        "string.email": "Invalid email format!",
      }),
    password: Joi.string()
      .min(6)
      .max(15)
      .required()
      .pattern(/^(?=.*[A-Z])/)
      .pattern(/^(?=.*\d)/)
      .pattern(/^(?=.*[@$!%*?&])/)
      .messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters",
        "string.max": "Password must not exceed 15 characters",
        "string.pattern.base": "Password does not meet complexity requirements",
      }),
    confirmpassword: Joi.any().valid(Joi.ref("password")).required().messages({
      "any.only": "Passwords do not match",
      "any.required": "Confirm Password is required",
    }),
    captcha: Joi.string().required().valid(generatedCaptcha).messages({
      "string.empty": "Captcha is required!",
      "any.only": "Captcha is incorrect",
    }),
  });

  const validatePassword = (password) => {
    // Regex for constraints
    const isValid =
      /^(?=.*[A-Z])/.test(password) &&
      /^(?=.*\d)/.test(password) &&
      /^(?=.*[@$!%*?&])/.test(password) &&
      password.length >= 6 &&
      password.length <= 15;

    setPasswordValid(isValid);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "password") {
      validatePassword(value);
    }

    setFormData({ ...formData, [name]: value });
  };

  const refreshCaptcha = (e) => {
    e.preventDefault();
    setGeneratedCaptcha(Captcha);
  };

  const handleSignup = (e) => {
    e.preventDefault();

    const { error } = signupSchema.validate(formData, { abortEarly: true });

    if (error) {
      toast.error(error.details[0].message);
      return;
    }

    toast.success("Signup successful");
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
      captcha: "",
    });
    setPasswordValid(false);
  };

  return (
    <div className="flex flex-row items-center justify-center min-w-96 ">
      <div className="h-full p-6 w-full bg-gray-700 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 transition-all ease-linear hover:shadow-lg duration-400 hover:shadow-slate-950">
        <h3 className="font-serif font-bold text-center text-gray-300 ">
          Signup
        </h3>
        <form onSubmit={handleSignup}>
          <div>
            <label className="label p-2 cursor-pointer">
              <span className="text-base label-text text-gray-300">
                Username
              </span>
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              placeholder="Enter username"
              className="w-full input input-bordered h-10"
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="label p-2 cursor-pointer">
              <span className="text-base label-text text-gray-300">Email</span>
            </label>
            <input
              name="email"
              value={formData.email}
              type="text"
              placeholder="Enter email"
              className="w-full input input-bordered h-10"
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="label flex p-2 cursor-pointer">
              <span className="text-base label-text text-gray-300">
                Password
              </span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              onChange={handleInputChange}
            />

            {!passwordValid && (
              <div className=" flex justify-center  text-center  text-xs  font-semibold text-red-400">
                6-15 letters, 1 uppercase, 1 digit, 1 special character !
              </div>
            )}
          </div>

          <div>
            <label className="label p-2 cursor-pointer">
              <span className="text-base label-text text-gray-300">
                Confirm Password
              </span>
            </label>
            <input
              type="password"
              name="confirmpassword"
              value={formData.confirmpassword}
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="label p-2 cursor-pointer">
              <div className="flex flex-row justify-center items-center ">
                <div className="text-base label-text mr-20">Captcha</div>
                <div className="font-serif font-semibold p-1 rounded-l border-gray-800">
                  {generatedCaptcha}
                </div>
              </div>
            </label>
            <div className="flex flex-row justify-center gap-x-2 items-center">
              <button
                onClick={refreshCaptcha}
                className="border-2 border-gray-500 text-gray-400 rounded-md h-10 px-3 leading-none focus:outline-none hover:text-black hover:bg-gray-400 transition-all duration-150 ease-linear"
              >
                Refresh
              </button>
              <input
                type="text"
                name="captcha"
                value={formData.captcha}
                placeholder="Enter captcha"
                className="w-full input input-bordered h-10"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <Link
            to="/login"
            className="text-sm cursor-pointer hover:underline text-gray-300 hover:text-blue-600 mt-4 inline-block"
          >
            Already have account
          </Link>

          <div>
            <button
              type="submit"
              className="btn btn-block btn-sm mt-5 hover:border-gray-950"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
