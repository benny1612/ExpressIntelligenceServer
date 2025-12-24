import express from "express";
import { addAgent, agentById, allAgents, deleteAgent, updataAgent } from "../ctrls/agentsC.js";
import { userValdiet } from "../Middleware.js";


const router = express.Router();
router.get("/",allAgents);
router.get("/:id", agentById);
router.post("/",userValdiet,addAgent);
router.put("/:id",userValdiet,updataAgent )
router.delete("/:id",userValdiet,deleteAgent);



export default router;