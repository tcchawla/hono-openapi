import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "../../http-status-codes";
import jsonContent from "@/lib/json-content.js";

const tags = ["Tasks"];

export  const list = createRoute({
  path: "/tasks",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(
        z.object({
          name: z.string(),
          done: z.boolean(),
        })
      ),
      "List of tasks",
    )
  }
})

export type ListRoute = typeof list;