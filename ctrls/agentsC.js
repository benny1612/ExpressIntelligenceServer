import { readData } from "../dataFunc.js";
import fs from "fs/promises";
const allAgents = async (req, res) => {
  try {
    const js_File = await readData("agents");
    res.json(js_File);
  } catch {
    err;
  }
  {
    console.error(err);
    res.status(500).json({ err });
  }
};
const agentById = async (req, res) => {
  try {
    const js_File = await readData("agents");
    const agentId = req.params.id;
    const findAgent = js_File.findIndex(
      (item) => item.id === parseInt(agentId)
    );
    if (findAgent != -1) {
      res.json(js_File[findAgent]);
    } else {
      res.json("user not found");
    }
  } catch {
    err;
  }
  {
    console.error(err);
    res.status(500).json({ err });
  }
};
const addAgent = async (req, res) => {
  const { name, nickname } = req.body;
  try {
    const js_File = await readData("agents");
    const maxId = Math.max(...js_File.map((o) => o.id));

    const newAgent = { id: maxId + 1, name, nickname, reportsCount: 0 };
    js_File.push(newAgent);
    const myText = JSON.stringify(js_File);
    await fs.writeFile("./data/agents.json", myText);
    res.json(newAgent, "addad");
  } catch {
    err;
  }
  {
    console.error(err);
    res.status(500).json({ err });
  }
};
const updataAgent = async (req, res) => {
  try {
    const js_File = await readData("agents");
    const agentId = req.params.id;
    const findAgent = js_File.findIndex(
      (item) => item.id === parseInt(agentId)
    );
    if (findAgent != -1) {
      js_File[findAgent]["name"] = req.body.name;
      const myText = JSON.stringify(js_File);
      await fs.writeFile("./data/agents.json", myText);
      res.json(js_File[findAgent]);
    } else {
      res.json("user not found");
    }
  } catch {
    err;
  }
  {
    console.error(err);
    res.status(500).json({ err });
  }
};
const deleteAgent = async (req, res) => {
  try {
    const js_File = await readData("agents");
    const id = req.params.id;
    const findAgent = js_File.findIndex((user) => user.id == id);
    if (findAgent != -1 && js_File[findAgent]["reportsCount"] == 0) {
      js_File.splice(findAgent, 1);
      const myText = JSON.stringify(js_File);
      await fs.writeFile("./data/agents.json", myText);
      res.json({ deleted: true });
    } else {
      res.json("user not found or reports Count > 0");
    }
  } catch (err) {
    console.error(err);
    res.json(err);
  }
};
export { allAgents, agentById, addAgent, updataAgent, deleteAgent };
