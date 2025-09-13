const User = require('../models/UserModels');

// Add or Update user
const syncUser = async (req, res)=> {
    try {
        const {uid} = req.params;
        const {displayName, email} = req.body;
        // Upsert (add) user if not exists & use Default values
        // new - return updated doc 
        const user = await User.findByIdAndUpdate(
            uid, {displayName, email}, {new: true, upsert: true, setDefaultsOnInsert: true}
        )
        res.status(200).json(
            {
                uid: user._id,
    displayName: user.displayName,
    email: user.email
            }
        );
    } catch (error) {
        res.status(500).json({message: "Error adding user", error});
    }

}

const getUser = async (req, res) => {
try {
    // Extract id from req params
const {uid} = req.params;
// Find user by id from the DB

const user = await User.findById(uid);
if(user) {
    res.status(200).json({
        uid: user._id,
    address: user.address,
    displayName: user.displayName,
    email: user.email
    });
} else {
    res.status(404).json({message: "User not found"});
}

} catch (error) {
    res.status(500).json({message: "Error fetching user", error});
}
}

const addAddress = async (req, res)=> {
try {
    // Extract uid to search
    const {uid} = req.params;
    const { address } = req.body;
    console.log("address received:",uid, address)
    // Fetch user first
    const user = await User.findById(uid);
    if (!user) {
        // TODO: User existence can be checked while validating token also ? except sync user function
        return res.status(404).json({ message: "User not found" });
    }
    // Ensure address array exists
    if (!Array.isArray(user.address)) {
        user.address = [];
    }
    // Check for duplicate by deep comparison
    const isDuplicate = user.address.some(a =>
        a.line1 === address.line1 &&
        a.line2 === address.line2 &&
        a.city === address.city &&
        a.state === address.state &&
        a.zip === address.zip &&
        a.country === address.country
    );
    if (isDuplicate) {
        return res.status(400).json({ message: "Address already exists" });
    }
    user.address.push(address);
    await user.save();
    console.log("address added");
    res.status(200).json(address);
} catch (error) {
    res.status(500).json({ message: "Error adding address", error });
}
}

const updateUserAddress = async (req, res)=> {
try {
    const { uid, addressId } = req.params;
    const {addressData} = req.body;
   
    // Check if user exists
    console.log('Checking if user exists')
    const user = await User.findById(uid);
    if(!user) {
        console.log("No user found")
        res.status(404).json({message: "User not found"})
    }

    // Check if address exists
    console.log('Checking if address exists')
    const addressExists = user.address.id(addressId);
    if (!addressExists) {
        console.log("No address found")
        return res.status(404).json({ message: "Address not found" });
    }

    console.log("Updating Address")
    addressExists.set(addressData);
    await user.save();

    res.status(200).json(user.address);
        
} catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating address" });
}
}

const deleteAddress = async (req, res) => {
    const {uid, addressId} = req.params;

    try {
        const deleteAddress = await User.updateOne(
            {_id: uid},
            {$pull: {address: {_id: addressId}}}
        );

        if(deleteAddress.modifiedCount < 1) {
        console.log("address not found");
        res.status(404).json({message: "address not found"});
        } else {
        console.log("Address deleted");
        res.status(200).json({message: "success"});
        }
   
    } catch (error) {
        res.status(500).json({message: "error"});
    }
}

module.exports = {
    syncUser,
    getUser,
    addAddress,
    updateUserAddress,
    deleteAddress
}
