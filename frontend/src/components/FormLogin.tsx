import { useState } from 'react';
import { IconFingerprint, IconLock, IconEye, IconEyeOff } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import * as userApi from "../api/user";
import z from 'zod';
const loginSchema = z.object({
    email: z
        .string()
        .email("Must be a valid email"),

    password: z
        .string()
        .min(6, "At least 6 characters")
        .regex(/[A-Z]/, "Must contain an uppercase letter")
        .regex(/[0-9]/, "Must contain a number"),
})

type LoginSchema = z.infer<typeof loginSchema>;
type FieldErrors = Partial<Record<keyof LoginSchema, string>>;

function FormLogin() {
    const navigate = useNavigate();
    const [isLock, setIsLock] = useState(true);
    const [formData, setFormData] = useState<LoginSchema>({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState<FieldErrors>({});
    const [apiError, setApiError] = useState<string>("");

    // API get user info - userId
    const getMe = async () => {
        const response = await userApi.getMe();
        if (response.success) {
            localStorage.setItem("userId", (response.data.userId));   
            navigate("/main-plinko-game");
        }
    }

    // API Login an account
    const loginUser = async (data: LoginSchema) => {
        const response = await userApi.loginUser(data.email, data.password);
        if (response.success) {
            getMe();
        } else {
            setApiError("Something went wrong, please try again")
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined })); // clear error on change
        setApiError("");
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const result = loginSchema.safeParse(formData)

        if (!result.success) {
            const fieldErrors: FieldErrors = {};
            result.error.issues.forEach((err) => {
                const field = err.path[0] as keyof LoginSchema;
                if (!fieldErrors[field]) {
                    fieldErrors[field] = err.message; // keep first error per field
                }
            });
            setErrors(fieldErrors);
            return;
        }

        // Send to backend via API user
        loginUser(formData);
    }

  return (
    <>
    <div className='inter flex justify-center mt-10'>
        <form onSubmit={handleSubmit} className='w-115 bg-[#0b1824] shadow-xl/30 p-10 rounded-lg'>
            <header className='text-center mb-4'>
                <h1 className='text-[#DCE6F5] text-2xl font-bold mb-3'>Secure Uplink</h1>
                <p className='text-[#94A3B8] text-sm font-light'>ENTER CREDENTIALS TO PROCEED</p>
            </header>
            <section className='my-10'>
                <label htmlFor="" className='space-grotesk text-[#94A3B8] text-sm font-light'>IDENTIFICATION</label> <br />
                <div className='flex items-center bg-black px-4 py-4 my-2 gap-5 rounded-lg'>
                    <IconFingerprint className='text-gray-600'></IconFingerprint>
                    <input name='email' type="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" className='text-white bg-black w-full placeholder:text-gray-600 border-none focus:outline-none focus:ring-0 focus:border-transparent'/>
                </div>
                {errors.email && <p className='text-red-500 mb-5'>{errors.email}</p>}
                 {apiError && <p className='text-red-500 mb-5'>{apiError}</p>}
                <label htmlFor="" className='space-grotesk text-[#94A3B8] text-sm font-light'>ACCESS KEY</label> <br />
                <div className='flex items-center bg-black px-4 py-4 my-2 gap-5 rounded-lg'>
                    <IconLock className='text-gray-600'></IconLock>
                    <input name='password' type={`${isLock ? "password" : "text"}`} value={formData.password} onChange={handleChange} placeholder='Enter your password' className='text-white bg-black w-full placeholder:text-gray-600 border-none focus:outline-none focus:ring-0 focus:border-transparent'/>
                    <button type="button" onClick={() => setIsLock(prev => !prev)}>
                    {isLock 
                        ? <IconEyeOff className='text-gray-600 cursor-pointer' /> 
                        : <IconEye className='text-gray-600 cursor-pointer' />
                    }
                    </button>
                </div>
                {errors.password && <p className='text-red-500 mb-5'>{errors.password}</p>}
            </section>
            <button type='submit' className='space-grotesk bg-[#39FE2B] w-full py-3 mb-10 font-bold rounded-md hover:bg-[#20df12] cursor-pointer'>INITIALIZE LOGIN</button>
            <section className='flex justify-center gap-5 text-sm w-full'>
                <p className='text-[#94A3B8] '>New to the Plinko Game?</p>
                <Link to={"/signup"} className='text-[#AFFF9A] font-bold hover:underline'>Establish Account</Link>
            </section>
        </form>
    </div>
    </>
  )
}

export default FormLogin