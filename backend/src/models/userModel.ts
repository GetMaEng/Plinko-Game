import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs";

const isDuplicate = async( username: string, email: string ) => {
    const user = await prisma.user.findFirst({
        where: {
            OR: [
                { username: username },
                { email: email },
            ],
        },
    });
    return user;
}

const createUser = async( username: string, email: string, password: string, imageProfile: string) => {
    const user = await prisma.user.create({
        data: {
            username: username,
            email: email,
            password: await bcrypt.hash(password, 10),
            imageProfile: imageProfile,
        }
    })
    return user;
}

const getAllUserInfo = async() => {
    const user = await prisma.user.findMany();
    return user;
}

const getUserInfoById = async(userId: number) => {
    const user = await prisma.user.findUnique({
        where: {
            userId: userId
        }
    });

    return user;
}

const updateUserInfo = async(userId: number, username: string, imageProfile: string) => {
    const user = await prisma.user.update({
        where: {
            userId: userId
        },
        data: {
            username: username,
            imageProfile: imageProfile
        }
    });
    return user;
}

const loginUser = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        }
    })
    return user;
}

export { isDuplicate, createUser, getAllUserInfo, getUserInfoById, updateUserInfo, loginUser }