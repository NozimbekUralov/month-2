import express from "express";
import fs, { writeFile } from "node:fs";

const app = express();
const DB = `${process.cwd()}/db/drinks.json`;

app.use(express.json());

app.post("/drink", async (req, res) => {
    const { name, price } = req.body;
    const drinks = await myReadFile(DB);
    const id = drinks.length ? drinks[drinks.length - 1].id + 1 : 1;
    drinks.push({ id, name, price });
    await myWriteFile(DB, drinks);
    res.statusCode = 201;
    res.json({ message: "created" });
});

app.get("/drinks", async (req, res) => {
    const drinks = await myReadFile(DB);
    res.json({ message: "drinks", drinks });
});

app.get("/drinks/:id", async (req, res) => {
    const { id } = req.params;
    const drinks = await myReadFile(DB);
    const drink = drinks.find((drink) => drink.id == id);
    res.json({ message: `drink ${id}`, drink });
});

app.put("/drinks/:id", async (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;
    const drinks = await myReadFile(DB);
    const index = drinks.findIndex((drink) => drink.id == id);
    drinks[index] = { id, name, price };
    await myWriteFile(DB, drinks);
    res.json({ message: `drink ${id} updated`, drink: drinks[index] });
});

app.delete("/drinks/:id", async (req, res) => {
    const { id } = req.params;
    const drinks = await myReadFile(DB);
    const index = drinks.findIndex((drink) => drink.id == id);
    const drink = drinks.splice(index, 1);
    await myWriteFile(DB, drinks);
    res.json({ message: `drink ${id} deleted`, drink });

});

app.listen(3000, () => console.log("server is running at http://localhost:3000"))

async function myReadFile(FilePath) {
    if (!is_created(FilePath)) await myWriteFile(FilePath, []);
    const data = await fs.promises.readFile(FilePath, "utf-8");
    return JSON.parse(data);
};

async function myWriteFile(FilePath, data) {
    if (!is_created(FilePath)) await fs.promises.mkdir(`${process.cwd()}/db`, { recursive: true });
    await fs.promises.writeFile(FilePath, JSON.stringify(data, null, 4), (err) => console.log(err));
};

function is_created(FilePath) {
    return fs.existsSync(FilePath);
};