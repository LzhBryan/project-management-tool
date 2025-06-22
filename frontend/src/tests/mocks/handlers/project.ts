import { GetProjectsResponseDto, GetProjectsResponseDtoColourEnum } from "@/apiClient"
import { http, HttpResponse } from "msw"
import { API_BASE_URL } from "../constants"

export const testProject1: GetProjectsResponseDto = {
  id: 1,
  name: "Music",
  colour: GetProjectsResponseDtoColourEnum.B8255f,
  taskCount: 1,
}

export const testProject2: GetProjectsResponseDto = {
  id: 2,
  name: "Fitness",
  colour: GetProjectsResponseDtoColourEnum.A4698c,
  taskCount: 1,
}

export const projectHandlers = [
  http.get(`${API_BASE_URL}/projects`, () => HttpResponse.json([testProject1, testProject2])),
]
