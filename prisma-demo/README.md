typeorm 是把表映射成 entity 类，然后调用 repository 的 api 来做 CRUD。

prisma 是把表射成 schema 的 model，然后编译生成 client 代码，之后进行 crud。

用到这两个命令：

primsa init 创建 schema 文件

prisma migrate dev 根据 schema 文件生成 sql 并执行，还会生成 client 代码。

之后就是 CRUD 了，涉及到 findMany、create、delete、update 等 api。
