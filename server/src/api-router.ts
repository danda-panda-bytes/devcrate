import express from "express";
import {data, DataType} from "./server.data";

const apiRoutes = express.Router({})

apiRoutes.get('/people', async (req, res, next) => {
  const {limit, offset, sortDir, sortField: sf, includeCount } = (req.query as { [key: string]: string | boolean | number })
  const sortField: keyof DataType = sf as keyof DataType

  let body = structuredClone(data)
  if (sortField) {
    body.sort((a, b) => {
      if (a[sortField] < b[sortField]) {
        return sortDir === 'asc' ? -1 : 1
      }
      if (a[sortField] > b[sortField]) {
        return sortDir === 'asc' ? 1 : -1
      }
      return 0
    })
  }

  // handle both offset and limit for the array
  if (offset || limit) {
    const start = Number(offset) || 0
    const end = Number(offset) + Number(limit) || body.length
    body = body.slice(start, end)
  }

  if (includeCount == 'true') {
    res.header("X-Total-Count", `${data.length}`)
  } else {
    res.header("X-Total-Count", null)
  }
  res.status(200).json(body)
})

export {apiRoutes}
