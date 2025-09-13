const addPrefixToID = (collection, prefix) => collection.map(item => {
    return {
        ...item._doc,
        _id: `${prefix}_${item._id}`
    }
});

module.exports = {
    addPrefixToID
};

