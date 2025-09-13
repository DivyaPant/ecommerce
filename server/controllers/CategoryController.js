const Category =  require("../models/CategoryModel");
const {addPrefixToID} = require("../utils/Utils");

const getCategories = async (req, res)=>{
try {
// Get categories from DB 
console.log("Fetching Categories...");
const categories = await Category.find();
console.log("Categories fetched successfully:");
const addPrefix = addPrefixToID(categories, "cat");
console.log("Categories Arr updated:");
res.status(200).json(addPrefix);
} catch (error) {
console.error("Error fetching categories:", error);
res.status(500).json({ message: "Internal server error" });
}

};

module.exports = {
    getCategories,
}