import { http, HttpResponse } from "msw"

import { IProject } from "@/modules/projects/components/project.types"

import { API_BASE_URL } from "../constants"

export const testProject1: IProject = {
  id: "1",
  name: "Music",
  colour: "#000000",
  count: 1,
}

export const testProject2 = {
  id: "2",
  name: "Fitness",
  colour: "#000000",
  count: 1,
}

export const projectHandlers = [
  http.get(`${API_BASE_URL}/projects`, () => {
    return HttpResponse.json({
      projects: [testProject1, testProject2],
      count: 2,
    })
  }),
]
