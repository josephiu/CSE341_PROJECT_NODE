const { object } = require('webidl-conversions');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;



const getAll = async (req, res) => {
    //#swagger.tags = ['guiter_makers']
    
    try {
        const db = mongodb.getDatabase().db('guiterproject');
        const lists = await db.collection('guiter_makers').find().toArray();
        
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};



const getsingle = async (req, res) => {
    //#swagger.tags = ['guiter_makers']
    
    // Check if the guiter_makers ID is valid
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Must use a valid guiter Id to retrieve guiter maker.' });
    }

    try {
        // Convert the guiter_makers to an ObjectId
        const guiterId = new ObjectId(req.params.id);
        const db = mongodb.getDatabase().db('guiterproject');
        
        // Try to find the contact in the database
        const result = await db.collection('guiter_makers').find({ _id: guiterId}).toArray();

        if (result.length > 0) {
            // If a guiters is found, send the result
            return res.status(200).json(result[0]);
        } else {
            // If no guiters is found, send a 404 error
            return res.status(404).json({ message: "Guiter makers not found" });
        }
    } catch (err) {
        // Handle errors gracefully, ensuring no duplicate responses are sent
        if (!res.headersSent) {
            return res.status(400).json({ message: err.message });
        }
    }
};






const createGuiter_maker = async(req, res) => {
     //#swagger.tags = ['guiter_makers']
    const guiter_maker = {

    name: req.body.name,
    year: req.body.year,
    country: req.body.year,
    url: req.body.url
            

    };
    const response = await mongodb.getDatabase().db('guiterproject').collection('guiter_makers').insertOne(guiter_maker);
    if (response.acknowledged) {
        res.status (204).send();
    } else {
        res.status(500).json(response.error || 'some error occured while creating the guiter maker.');
    }
};


const updateGuiter_maker = async(req, res) => {
     //#swagger.tags = ['guiter_makers']
     if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid Id to upadate guiter_maker')
     }

    const guiterId = new ObjectId (req.params.id);
    const guiter_maker = {       

        name: req.body.name,
        year: req.body.year,
        country: req.body.year,
        url: req.body.url        
        
    };
    const response = await mongodb.getDatabase().db('guiterproject').collection('guiter_maker').replaceOne({_id: guiterId}, guiter_maker);
    if (response.modifiedCount > 0) {
        res.status (204).send();
    } else {
        res.status(500).json(response.error || 'some error occured while updating the guiter maker.');
    }

};



const deleteGuiter_maker = async (req, res) => {
    //#swagger.tags = ['guiter_makers']
    try {
        const guitertId = req.params.id;

        // Check if the provided ID is a valid ObjectId
        if (!ObjectId.isValid(guitertId)) {
            return res.status(400).json({
                message: 'Must use a valid guiter ID to delete a guiter maker'
            });
        }

        // Convert the ID to ObjectId
        const objectId = new ObjectId(guitertId);
        
        // Perform the delete operation
        const response = await mongodb
            .getDatabase()
            .db('guiterproject')
            .collection('guiter_makers')
            .deleteOne({ _id: objectId });

        if (response.deletedCount > 0) {
            return res.status(204).send(); // No content to return on successful delete
        } else {
            return res.status(404).json({
                message: 'guiter maker not found, deletion failed.'
            });
        }
    } catch (err) {
        // Catch any errors that might occur
        console.error('Error during delete operation:', err);
        return res.status(500).json({
            message: err.message || 'An error occurred while deleting the guiter maker.'
        });
    }
};



module.exports = {getAll, getsingle,createGuiter_maker,updateGuiter_maker,deleteGuiter_maker};