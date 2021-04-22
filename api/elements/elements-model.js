const db = require("../../data/dbConfig");

const getAll = () => {
    return db("elements").orderBy("periodic_number");
};

const getById = async (element_id) => {
    return await db("elements").where("element_id", element_id).first();
};


const insert = async (newElement) => {
    const [element_id] = await db("elements").insert(newElement);
    return getById(element_id);
};

const remove = async (element_id) => {
    let id = parseInt(element_id)
    return await db("elements").where("element_id", id).del();
};


module.exports = {
    getAll,
    insert,
    remove
}