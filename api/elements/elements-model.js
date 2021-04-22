const db = require("../../data/dbConfig");

const getAll = () => {
    return db("elements").orderBy("periodic_number");
};

const getById = (element_id) => {
    return db("elements").where(element_id).first();
};


const insert = async (newElement) => {
    const [element_id] = await db("elements").insert(newElement);
    return getById(element_id);
};

const remove = (element_id) => {
    return db("elements").where(element_id).del();
};


module.exports = {
    getAll,
    insert,
    remove
}