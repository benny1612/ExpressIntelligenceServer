import express from "express";
import { addReport, allreports, deletereport, reportById, updataReportId } from "../ctrls/reportsC.js";
import { userValdiet } from "../Middleware.js";


const router = express.Router();
router.get("/",allreports);
router.get("/:id",reportById );
router.post("/",userValdiet,addReport );
router.put("/:id",userValdiet,updataReportId );
router.delete("/:id",userValdiet,deletereport );



export default router;