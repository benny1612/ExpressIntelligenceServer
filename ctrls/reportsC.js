import { readData } from "../dataFunc.js";
import fs from "fs/promises";

const allreports = async (req, res) => {
  try {
    const js_File = await readData("reports");
    res.json(js_File);
  } catch {
    err;
  }
  {
    console.error(err);
    res.status(500).json({ err });
  }
};
const reportById = async (req, res) => {
  try {
    const js_File = await readData("reports");
    const reportId = req.params.id;
    const findreport = js_File.findIndex(
      (item) => item.id === parseInt(reportId)
    );
    if (findreport != -1) {
      res.json(js_File[findreport]);
    } else {
      res.json("report not found");
    }
  } catch {
    err;
  }
  {
    console.error(err);
    res.status(500).json({ err });
  }
};

const addReport = async (req, res) => {
  const { content, agentId } = req.body;

  try {
    const agentsDb = await readData("agents");
    const reportsDB = await readData("reports");

    const findAgentID = agentsDb.findIndex(
      (item) => item.id === parseInt(agentId)
    );

    if (findAgentID === -1) {
      return res.status(404).json({ error: "Agent not found" });
    }

    const maxId = reportsDB.length
      ? Math.max(...reportsDB.map((o) => o.id))
      : 0;

    const newReport = {
      id: maxId + 1,
      date: new Date().toISOString(),
      content,
      agentId,
    };

    reportsDB.push(newReport);
    await fs.writeFile("./data/reports.json", JSON.stringify(reportsDB));

    agentsDb[findAgentID].reportsCount += 1;
    await fs.writeFile("./data/agents.json", JSON.stringify(agentsDb));

    res.json(newReport);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
const updataReportId = async (req, res) => {
  res.json("Changing a report ID is not possible.");
};
const deletereport = async (req, res) => {
  try {
    const reportsDB = await readData("reports");
    const agentsDB = await readData("agents");
    const id = req.params.id;
    const findReport = reportsDB.findIndex((report) => report.id == id);
    if (findReport != -1) {
      reportsDB.splice(findReport, 1);
      const updateReport = JSON.stringify(reportsDB);
      await fs.writeFile("./data/report.json", updateReport);
      const agentId = reportsDB[findReport]["agentId"];
      const findAgent = agentsDB.findIndex((agent) => (agent.id = agentId));
      const reducingReports = agentsDB[findAgent]["reportsCount"];
      if (reducingReports > 0) {
        agentsDB[findAgent]["reportsCount"] -= 1;
      } else {
        res.json("reports count = 0");
      }
      const updataReportCont = JSON.stringify(agentsDB);
      await fs.writeFile("./data/agents.json", updataReportCont);

      res.json({ deleted: true });
    } else {
      res.json("report not found");
    }
  } catch (err) {
    console.error(err);
    res.json(err);
  }
};

export { allreports, reportById, addReport, updataReportId, deletereport };
