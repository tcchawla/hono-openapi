import { insertTasksSchema, patchTasksSchema, selectTasksSchema } from '@/db/schema.js'
import { notFoundSchema } from '@/lib/constants'
import jsonContentRequired from '@/lib/json-content-required.js'
import jsonContent from '@/lib/json-content.js'
import createErrorSchema from '@/schemas/error-schema.js'
import IdParamsSchema from '@/schemas/id-params.js'
import { createRoute, z } from '@hono/zod-openapi'
import * as HttpStatusCodes from '../../http-status-codes'

const tags = ['Tasks']

export const list = createRoute({
  path: '/tasks',
  method: 'get',
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectTasksSchema),
      'List of tasks',
    ),
  },
})

export const create = createRoute({
  path: '/tasks',
  method: 'post',
  request: {
    body: jsonContentRequired(
      insertTasksSchema,
      'Task to create',
    ),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectTasksSchema,
      'Created Tasks',
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertTasksSchema),
      'Validation error',
    ),
  },
})

export const getOne = createRoute({
  path: '/tasks/{id}',
  method: 'get',
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectTasksSchema,
      'Requested task',
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      'Task not found',
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertTasksSchema),
      'Invalid ID Error',
    ),
  },
})

export const patch = createRoute({
  path: '/tasks/{id}',
  method: 'patch',
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(
      patchTasksSchema,
      'Task to update',
    ),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectTasksSchema,
      'Updated Tasks',
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      'Task not found',
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(patchTasksSchema)
        .or(createErrorSchema(IdParamsSchema)),
      'Validation error ID Param or Body',
    ),
  },
})

export const remove = createRoute({
  path: '/tasks/{id}',
  method: 'delete',
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: 'Task deleted',
    },
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      'Task not found',
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      'Validation error ID',
    ),
  },
})

export type ListRoute = typeof list

export type CreateRoute = typeof create

export type GetOneRoute = typeof getOne

export type PatchRoute = typeof patch

export type DeleteRoute = typeof remove
