import { readData } from "../dataFunc.js";
import fs from "fs/promises";

const allUsers = async (req, res) => {
  try {
    const js_File = await readData("users");
    res.json(js_File);
  } catch {
    err;
  }
  {
    console.error(err);
    res.status(500).json({ err });
  }
};

const addUser = async (req, res) => {
  try {
    const js_File = await readData("users");
    const new_user = { name: req.body.name, password: req.body.password };
    js_File.push(new_user);
    const myText = JSON.stringify(js_File);
    await fs.writeFile("./data/users.json", myText);
    res.json(new_user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err });
  }
};
const updataUser = async (req, res) => {
  try {
    const js_File = await readData("users");
    const newPassword = req.body.password;
    const name = req.params.username;
    const findUser = js_File.findIndex((user) => user.name == name);
    if (findUser != -1) {
      js_File[findUser]["password"] = newPassword;
      const myText = JSON.stringify(js_File);
      await fs.writeFile("./data/users.json", myText);
      res.json(js_File[findUser]);
    } else {
      res.jeson("user not found");
    }
  } catch (err) {
    console.error(err);
    res.json({ err });
  }
};
const deleteUser = async (req, res) => {
  try {
    const js_File = await readData("users");
    const name = req.params.username;
    const findUser = js_File.findIndex((user) => user.name == name);
    if (findUser != -1) {
      js_File.splice(findUser, 1);
      const myText = JSON.stringify(js_File);
      await fs.writeFile("./data/users.json", myText);
      res.json({ deleted: true });
    } else {
      res.json("user not found");
    }
  } catch (err) {
    console.error(err);
    res.json(err);
  }
};
export { addUser, allUsers, updataUser, deleteUser };
