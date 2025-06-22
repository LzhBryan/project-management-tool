import { http, HttpResponse } from "msw"

import { API_BASE_URL } from "../constants"

export const authHandlers = [
  http.post(`${API_BASE_URL}/auth/register`, () => {
    return HttpResponse.text("Successfully registered")
  }),
  http.post(`${API_BASE_URL}/auth/login`, () => {
    return HttpResponse.text("Successfully login")
  }),
]
