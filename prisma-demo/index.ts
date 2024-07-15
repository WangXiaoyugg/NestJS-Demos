// 使用prisma 完成增删改查
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient({
    log: [
        {
            emit: 'stdout',
            level: 'query',
        }
    ]
});

async function  createUsers() {
    await prisma.user.create({
        data: {
            name: '张三',
            email: "zhangsan@gmail.com"
        }
    })

    await prisma.user.create({
        data: {
            name: '李四',
            email: "lisi@gmail.com"
        }
    })
}

async function queryUsers() {
    const users = await prisma.user.findMany();
    console.log("users: ", users);
}

async function createUserWithPosts() {
    const user = await prisma.user.create({
        data: {
            name: '王五',
            email: "wangwu@gmail.com",
            posts: {
                create: [
                    {
                        title: "you don't know js",
                        content: "there are many secret in js"
                    },
                    {
                        title: "you don't know css",
                        content: "there are many secret in css"
                    },
                ]
            }
        }
    })
    console.log("user: ", user);
}

async function updatePost() {
    await prisma.post.update({
        where: {
            id: 2,
        },
        data: {
            content: "No secret in css"
        }
    })
}

async function deletePost() {
    await prisma.post.delete({
        where: {
            id: 2,
        }
    })
}

async function main() {
    await createUsers()
    await queryUsers()
    await createUserWithPosts();
    await updatePost();
    await deletePost();
}

main();