const request = require("supertest");
const db = require("../data/dbConfig");
const server = require("./server");

const hydrogen = { name: 'Hydrogen', symbol: "H", periodic_number: 1 };
beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
});

beforeEach(async () => {
    await db("elements").truncate()
});

afterAll(async () => {
    await db.destroy()
});

describe("server", () => {
    describe("[GET] /api/elements", () => {
        it("responds with 200 ok", async () => {
            const res = await request(server).get("/api/elements/");
            expect(res.status).toBe(200);
        });
        it("returns the right data", async () => {
            let res
            await db("elements").insert(hydrogen);
            res = await request(server).get("/api/elements/")
            expect(res.body[0]).toEqual({ element_id: 1, ...hydrogen });
        })
    });

    describe("[POST] /api/elements", () => {
        it("responds with 201 ok", async () => {
            const res = await request(server).post("/api/elements/").send(hydrogen);
            expect(res.status).toBe(201);
        });
        it("returns the right data", async () => {
            let res
            res = await request(server).post("/api/elements/").send(hydrogen);
            expect(res.body.data).toEqual({ element_id: 1, ...hydrogen });
        })
    });

    describe("[DELETE] /api/elements", () => {
        it("responds with 200 ok", async () => {
            let res
            await db("elements").insert(hydrogen);
            res = await request(server).delete("/api/elements/1");
            expect(res.status).toBe(200);
        });
        it("returns the right amount of objects deleted", async () => {
            let res
            await db("elements").insert(hydrogen);
            res = await request(server).delete("/api/elements/1");
            expect(res.body.dbResponse).toBe("Elements deleted 1");
        });
        it("returns the right warning message on deletion", async () => {
            const expectedMessage = "Great you just deleted a whole element, be aware universe's structure has been compromised thanks to you.";
            let res
            await db("elements").insert(hydrogen);
            res = await request(server).delete("/api/elements/1");
            expect(res.body.message).toBe(expectedMessage);
        });
    });
})