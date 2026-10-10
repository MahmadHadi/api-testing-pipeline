
const axios = require("axios");

const api = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000,
});

describe("Products API Tests", () => {
  test("GET /products/1 should return a valid product", async () => {
    const response = await api.get("/products/1");

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty("id", 1);
    expect(response.data).toHaveProperty("title");
    expect(response.data.price).toEqual(expect.any(Number));
  });

  test("GET /products should return a list of products", async () => {
    const response = await api.get("/products");

    expect(response.status).toBe(200);
    expect(response.data.products.length).toBeGreaterThan(0);
  });

  test("GET /products/invalid should return an error", async () => {
    await expect(api.get("/products/invalid")).rejects.toMatchObject({
      response: {
        status: 404,
      },
    });
  });
});
