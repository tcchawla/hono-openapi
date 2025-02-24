import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "../../http-status-codes";
import jsonContent from "@/lib/json-content.js";
import { insertTasksSchema, selectTasksSchema } from "@/db/schema.js";
import jsonContentRequired from "@/lib/json-content-required.js";
import createErrorSchema from "@/schemas/error-schema.js";

const tags = ["Tasks"];

export  const list = createRoute({
  path: "/tasks",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectTasksSchema),
      "List of tasks",
    )
  }
})

export  const create = createRoute({
  path: "/tasks",
  method: "post",
  request: {
    body: jsonContentRequired(
      insertTasksSchema,
      "Task to create",
    )
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectTasksSchema,
      "Created Tasks",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertTasksSchema),
      "Validation error",
    ),
  }
})

export type ListRoute = typeof list;

export type CreateRoute = typeof create;