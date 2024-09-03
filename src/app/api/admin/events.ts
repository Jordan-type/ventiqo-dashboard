import { NextApiRequest, NextApiResponse } from "next";
import { getAllEvents } from "@/config/APIConfig";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
      try {
        const events = await getAllEvents();
        res.status(200).json(events);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch events" });
      }
    } else {
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  };