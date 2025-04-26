import fs from "node:fs";

export const config = {
    PORT: 3000,
    POSTS: `${process.cwd()}/db/posts.json`,
    USERS: `${process.cwd()}/db/users.json`,
    VIEWS: (fileName) => fs.promises.readFile(`${process.cwd()}/src/views/${fileName}.html`, "utf-8"),
}

export const idProvider = (sourcePath) => {
    if (!fs.existsSync(sourcePath)) throw new Error("file not found");
    const data = JSON.parse(fs.readFileSync(sourcePath, "utf-8"));
    return data.length ? data[data.length - 1].id + 1 : 1;
}

export const myReadFile = async (path) => {
    const data = await fs.promises.readFile(path, "utf-8");
    return data ? JSON.parse(data) : [];
}

export const myWriteFile = async (path, data) => {
    return await fs.promises.writeFile(path, JSON.stringify(data, null, 4));
}