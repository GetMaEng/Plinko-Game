import { IconPencil, IconUser, IconFingerprint, IconLock, IconShield, IconArrowNarrowLeft, IconBolt } from '@tabler/icons-react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as userApi from "../api/user";
import * as walletApi from "../api/wallet";
import z from 'zod';
import ModalImage from "./ModalImage";
import avatar1 from '../images/avatar-1.PNG';
import avatar2 from '../images/avatar-2.PNG';
import avatar3 from '../images/avatar-3.PNG';
import avatar4 from '../images/avatar-4.PNG';
import avatar5 from '../images/avatar-5.PNG';
import avatar6 from '../images/avatar-6.PNG';
import avatar7 from '../images/avatar-7.PNG';

const POKER_IMAGES = [
  avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7
];

const registerSchema = z.object({
    imageProfile: z
        .string(),
    username: z
        .string()
        .min(3, "At least 3 characters")
        .max(20, "At most 20 characters")
        .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores"),

    email: z
        .string()
        .email("Must be a valid email"),

    password: z
        .string()
        .min(6, "At least 6 characters")
        .regex(/[A-Z]/, "Must contain an uppercase letter")
        .regex(/[0-9]/, "Must contain a number"),

    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],   // points the error at the right field
});

type RegisterInput = z.infer<typeof registerSchema>;
type FieldErrors = Partial<Record<keyof RegisterInput, string>>;

function FormRegister() {
    const navigate = useNavigate();
    const [currentImg, setCurrentImg] = useState(POKER_IMAGES[0]);
    const [tempSelectedImg, setTempSelectedImg] = useState(POKER_IMAGES[0]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState<RegisterInput>({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        imageProfile: currentImg
    });
    const [errors, setErrors] = useState<FieldErrors>({});

    const [userId, setUserId] = useState<number>()
    // API Create an account
    const createUser = async (data: RegisterInput) => {
        const response = await userApi.createUser(data.username, data.email, data.password, data.imageProfile);
        if (response.success) {
            setUserId(response.data.userId);
        }
    }
    // API create wallet of user
    const createWallet = async (userId: number) => {
        console.log(userId);
        const response = await walletApi.createWallet(userId);
        if (response.success) {
            navigate("/login");
        }
    }

    useEffect(() => {
        if(!userId) return;

        createWallet(userId)
    }, [userId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined })); // clear error on change
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const result = registerSchema.safeParse(formData)

        if (!result.success) {
            const fieldErrors: FieldErrors = {};
            result.error.issues.forEach((err) => {
                const field = err.path[0] as keyof RegisterInput;
                if (!fieldErrors[field]) {
                    fieldErrors[field] = err.message; // keep first error per field
                }
            });
            setErrors(fieldErrors);
            return;
        }

        // Send to backend via API user
        createUser(formData);
        
    }

  return (
    <div className='inter flex justify-center items-center mt-6 sm:mt-10 px-4 w-full'>
        <form onSubmit={handleSubmit} className='w-full max-w-sm sm:max-w-md md:max-w-lg bg-[#0b1824] shadow-xl/30 p-6 sm:p-8 md:p-10 rounded-lg'>
            <header className='mb-4'>
                <h1 className='text-[#DCE6F5] text-2xl font-bold mb-3'>New Uplink</h1>
            </header>
            <section className='flex justify-center'>
                <div className="relative w-20 h-20 sm:w-28 sm:h-28 border-4 border-[#aeff9a50] rounded-lg overflow-visible shadow-2xl">
                    <img 
                    src={currentImg} 
                    alt="Avatar" 
                    className="w-full h-auto object-cover rounded-lg"
                    />
                    
                    {/* Edit Button - Bottom Right */}
                    <button type='button'
                    onClick={() => setIsModalOpen(true)}
                    className="absolute bottom-0 right-0 bg-[#AFFF9A] hover:bg-[#85bd77] text-black p-1 rounded-full shadow-lg transition-transform hover:scale-110"
                    >
                    <IconPencil size={18}></IconPencil>
                    </button>
                </div>
            </section>
            <section className='my-6 sm:my-10'>
                <label htmlFor="" className='space-grotesk text-[#94A3B8] text-sm font-light'>USERNAME</label> <br />
                <div className='flex items-center bg-black px-4 py-4 my-2 gap-5 rounded-lg'>
                    <IconUser className='text-gray-600'></IconUser>
                    <input name='username' type="text" value={formData.username} onChange={handleChange} placeholder="Enter your username" className='text-white bg-black w-full placeholder:text-gray-600 border-none focus:outline-none focus:ring-0 focus:border-transparent'/>
                </div>
                {errors.username && <p className='text-red-500 mb-5'>{errors.username}</p>}
                <label htmlFor="" className='space-grotesk text-[#94A3B8] text-sm font-light'>IDENTIFICATION</label> <br />
                <div className='flex items-center bg-black px-4 py-4 my-2 gap-5 rounded-lg'>
                    <IconFingerprint className='text-gray-600'></IconFingerprint>
                    <input name='email' type="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" className='text-white bg-black w-full placeholder:text-gray-600 border-none focus:outline-none focus:ring-0 focus:border-transparent'/>
                </div>
                {errors.email && <p className='text-red-500 mb-5'>{errors.email}</p>}
                <label htmlFor="" className='space-grotesk text-[#94A3B8] text-sm font-light'>ACCESS KEY</label> <br />
                <div className='flex items-center bg-black px-4 py-4 my-2 gap-5 rounded-lg'>
                    <IconLock className='text-gray-600'></IconLock>
                    <input name='password' type='password' value={formData.password} onChange={handleChange} placeholder='Enter your password' className='text-white bg-black w-full placeholder:text-gray-600 border-none focus:outline-none focus:ring-0 focus:border-transparent'/>
                </div>
                {errors.password && <p className='text-red-500 mb-5'>{errors.password}</p>}
                <label htmlFor="" className='space-grotesk text-[#94A3B8] text-sm font-light'>CONFIRM ACCESS KEY</label> <br />
                <div className='flex items-center bg-black px-4 py-4 my-2 gap-5 rounded-lg'>
                    <IconShield className='text-gray-600'></IconShield>
                    <input name='confirmPassword' type='password' value={formData.confirmPassword} onChange={handleChange} placeholder='Enter your confirm password' className='text-white bg-black w-full placeholder:text-gray-600 border-none focus:outline-none focus:ring-0 focus:border-transparent'/>
                </div>
                {errors.confirmPassword && <p className='text-red-500 mb-5'>{errors.confirmPassword}</p>}
            </section>
            <button type='submit' className='space-grotesk bg-[#39FE2B] w-full py-3 mb-6 sm:mb-10 font-bold rounded-md hover:bg-[#20df12] cursor-pointer flex justify-center items-center gap-2'>INITIALIZE ACCOUNT <IconBolt></IconBolt> </button>
            <section className='flex justify-center text-sm w-full'>
                <Link to={"/login"} className='text-[#94A3B8] hover:underline'>
                    <div className='flex gap-2'>
                        <IconArrowNarrowLeft></IconArrowNarrowLeft>
                        <p>Return to Login</p>
                    </div>
                </Link>
            </section>
        </form>
        {isModalOpen && <ModalImage 
            setCurrentImg={setCurrentImg} 
            tempSelectedImg={tempSelectedImg} 
            setIsModalOpen={setIsModalOpen} 
            setTempSelectedImg={setTempSelectedImg}
            currentTime={currentImg}>
        </ModalImage>
        }
    </div>
  )
}

export default FormRegister