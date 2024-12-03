// src/services/__tests__/api.test.js

import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getProfile } from "../api";

describe("getProfile", () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  it("should fetch user profile successfully", async () => {
    const mockProfile = { name: "John Doe", email: "john@example.com" };
    const token = "mockToken";

    // Mock localStorage token
    localStorage.setItem("token", token);

    // Mock API response
    mock.onGet(`${BASE_URL}/users/profile`).reply(200, mockProfile);

    const result = await getProfile();
    expect(result).toEqual(mockProfile);
  });

  it("should throw an error if no token is found", async () => {
    localStorage.removeItem("token");

    await expect(getProfile()).rejects.toThrow("No token found");
  });

  it("should throw an error if the request fails", async () => {
    const token = "mockToken";

    // Mock localStorage token
    localStorage.setItem("token", token);

    // Mock API failure
    mock.onGet(`${BASE_URL}/users/profile`).reply(500);

    await expect(getProfile()).rejects.toThrow("Failed to fetch user profile");
  });
});
