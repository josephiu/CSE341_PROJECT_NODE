const { object } = require('webidl-conversions');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;



const getAll = async (req, res) => {
    //#swagger.tags = ['contacts']
    
    try {
        const db = mongodb.getDatabase().db('contactproject');
        const lists = await db.collection('contacts').find().toArray();
        
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// const getsingle = async (req, res) => {
//     //#swagger.tags = ['contacts']
//     if (!ObjectId.isValid(req.params.id)) {
//         res.status(400).json('Must use a valid contact is to delete a contact')
//     }
//     try {
//         const contactId = new ObjectId(req.params.id);
//         const db = mongodb.getDatabase().db('contactproject');
//         const result = await db.collection('contacts').find({ _id: contactId }).toArray();
        
//         if (result.length > 0) {
//             // res.setHeader('Content-Type', 'application/json');
//             res.status(200).json(result[0]);
//         } else {
//             res.status(404).json({ message: "Contact not found" });
//         }
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// };


const getsingle = async (req, res) => {
    //#swagger.tags = ['contacts']
    
    // Check if the contact ID is valid
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Must use a valid contact ID to retrieve a contact' });
    }

    try {
        // Convert the contact ID to an ObjectId
        const contactId = new ObjectId(req.params.id);
        const db = mongodb.getDatabase().db('contactproject');
        
        // Try to find the contact in the database
        const result = await db.collection('contacts').find({ _id: contactId }).toArray();

        if (result.length > 0) {
            // If a contact is found, send the result
            return res.status(200).json(result[0]);
        } else {
            // If no contact is found, send a 404 error
            return res.status(404).json({ message: "Contact not found" });
        }
    } catch (err) {
        // Handle errors gracefully, ensuring no duplicate responses are sent
        if (!res.headersSent) {
            return res.status(400).json({ message: err.message });
        }
    }
};






const createContact = async(req, res) => {
     //#swagger.tags = ['contacts']
    const contact = {
        first_name: req.body.first_name,
        last_name:req.body.last_name,
        phone:req.body.phone,
        email: req.body.email, 
        birthday: req.body.birthday,   
        favourite_color: req.body.favourite_color 
        

    };
    const response = await mongodb.getDatabase().db('contactproject').collection('contacts').insertOne(contact);
    if (response.acknowledged) {
        res.status (204).send();
    } else {
        res.status(500).json(response.error || 'some error occured while creating the contact.');
    }
};


const updateContact = async(req, res) => {
     //#swagger.tags = ['contacts']
     if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact is to delete a contact')
     }

    const contactId = new ObjectId (req.params.id);
    const contact = {
        first_name: req.body.first_name,
        last_name:req.body.last_name,
        phone:req.body.phone,
        email: req.body.email, 
        birthday: req.body.birthday,   
        favourite_color: req.body.favourite_color 
        
        
    };
    const response = await mongodb.getDatabase().db('contactproject').collection('contacts').replaceOne({_id: contactId}, contact);
    if (response.modifiedCount > 0) {
        res.status (204).send();
    } else {
        res.status(500).json(response.error || 'some error occured while updating the contact.');
    }

};



const deleteContact = async (req, res) => {
    //#swagger.tags = ['contacts']
    try {
        const contactId = req.params.id;

        // Check if the provided ID is a valid ObjectId
        if (!ObjectId.isValid(contactId)) {
            return res.status(400).json({
                message: 'Must use a valid contact ID to delete a contact'
            });
        }

        // Convert the ID to ObjectId
        const objectId = new ObjectId(contactId);
        
        // Perform the delete operation
        const response = await mongodb
            .getDatabase()
            .db('contactproject')
            .collection('contacts')
            .deleteOne({ _id: objectId });

        if (response.deletedCount > 0) {
            return res.status(204).send(); // No content to return on successful delete
        } else {
            return res.status(404).json({
                message: 'Contact not found, deletion failed.'
            });
        }
    } catch (err) {
        // Catch any errors that might occur
        console.error('Error during delete operation:', err);
        return res.status(500).json({
            message: err.message || 'An error occurred while deleting the contact.'
        });
    }
};



module.exports = {getAll, getsingle,createContact,updateContact,deleteContact};