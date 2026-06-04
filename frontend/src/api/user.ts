import { Axios } from "../lib/axios";

export const createUser = async (username: string, email: string, password: string, imageProfile: string) => {
    try {
        const response = await Axios.post("/user", {
            username: username,
            email: email,
            password: password,
            imageProfile: imageProfile
        })
        return {
            status: 200,
            success: true,
            msg: "Create an account successfully.",
            data: response.data.data
        }
    } catch (e) {
        return {
            status: 500,
            success: false,
            error: `Error failed: ${e}`
        }
    }
}

export const getAllUserInfo = async () => {
    try {
        const response = await Axios.get("/user");
        return {
            status: 200,
            success: true,
            data: response.data.data
        }
    } catch (e) {
        return {
            status: 500,
            success: false,
            error: `Error failed: ${e}`
        }
    }
}

export const getUserInfoById = async (userId: number) => {
    try {
        const response = await Axios.get(`/user/${userId}`);
        return {
            status: 200,
            success: true,
            data: response.data.data
        }
    } catch (e) {
        return {
            status: 500,
            success: false,
            error: `Error failed: ${e}`
        }
    }
}

export const updataUserInfo = async (userId: number) => {
    try {
        await Axios.patch(`/user/${userId}`);
        return {
            status: 200,
            success: true,
            msg: `Update information of this user ID ${userId}.`
        }
    } catch (e) {
        return {
            status: 500,
            success: false,
            error: `Error failed: ${e}`
        }
    }
}

export const loginUser = async (email: string, password: string) => {
    try {
        await Axios.post("/user/login", {
            email: email,
            password: password,
        })
        return {
            status: 200,
            success: true,
            msg: "Login successfully."
        }
    } catch (e) {
        return {
            status: 500,
            success: false,
            error: `Error failed: ${e}`
        }
    }
}

export const logoutUser = async () => {
    try {
        await Axios("user/logout");
        return {
            status: 200,
            success: true,
            msg: "Logout successfully."
        }
    } catch (e) {
        return {
            status: 500,
            success: false,
            error: `Error failed: ${e}`
        }
    }
}

export const getMe = async () => {
    try {
        const response = await Axios("/user/me");
        return {
            status: 200,
            success: true,
            data: response.data.data.data
        }
    } catch (e) {
        return {
            status: 500,
            success: false,
            error: `Error failed: ${e}`
        }
    }
}