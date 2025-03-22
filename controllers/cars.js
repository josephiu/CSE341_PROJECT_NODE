const { object } = require('webidl-conversions');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;



const getAll = async (req, res) => {
    //#swagger.tags = ['cars']
    
    try {
        const db = mongodb.getDatabase().db('carprojects');
        const lists = await db.collection('cars').find().toArray();
        
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};



const getsingle = async (req, res) => {
    //#swagger.tags = ['cars']
    
    // Check if the car ID is valid
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Must use a valid car Id to retrieve cars' });
    }

    try {
        // Convert the car ID to an ObjectId
        const carId = new ObjectId(req.params.id);
        const db = mongodb.getDatabase().db('carprojects');
        
        // Try to find the contact in the database
        const result = await db.collection('cars').find({ _id: carId }).toArray();

        if (result.length > 0) {
            // If a car is found, send the result
            return res.status(200).json(result[0]);
        } else {
            // If no cars is found, send a 404 error
            return res.status(404).json({ message: "Car not found" });
        }
    } catch (err) {
        // Handle errors gracefully, ensuring no duplicate responses are sent
        if (!res.headersSent) {
            return res.status(400).json({ message: err.message });
        }
    }
};






const createCar = async(req, res) => {
     //#swagger.tags = ['cars']
    const car = {
        Name: req.body.Name,
        Miles_per_Gallon: req.body.Miles_per_Gallon,
        Cylinders: req.body.Cylinders,
        Displacement: req.body.Displacement,
        Horsepower: req.body.Horsepower,
        Weight_in_lbs: req.body.Weight_in_lbs,
        Acceleration: req.body.Acceleration,
        Year: req.body.Year,
        Origin: req.body.Origin
        

    };
    const response = await mongodb.getDatabase().db('carprojects').collection('cars').insertOne(car);
    if (response.acknowledged) {
        res.status (204).send();
    } else {
        res.status(500).json(response.error || 'some error occured while creating the car.');
    }
};


const updateCar = async(req, res) => {
     //#swagger.tags = ['cars']
     if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid Id to upadate car')
     }

    const carId = new ObjectId (req.params.id);
    const car = {      

            Name: req.body.Name,
            Miles_per_Gallon: req.body.Miles_per_Gallon,
            Cylinders: req.body.Cylinders,
            Displacement: req.body.Displacement,
            Horsepower: req.body.Horsepower,
            Weight_in_lbs: req.body.Weight_in_lbs,
            Acceleration: req.body.Acceleration,
            Year: req.body.Year,
            Origin: req.body.Origin
        
        
    };
    const response = await mongodb.getDatabase().db('carprojects').collection('cars').replaceOne({_id: carId}, car);
    if (response.modifiedCount > 0) {
        res.status (204).send();
    } else {
        res.status(500).json(response.error || 'some error occured while updating the car.');
    }

};



const deleteCar = async (req, res) => {
    //#swagger.tags = ['cars']
    try {
        const carId = req.params.id;

        // Check if the provided ID is a valid ObjectId
        if (!ObjectId.isValid(carId)) {
            return res.status(400).json({
                message: 'Must use a valid cars ID to delete a car'
            });
        }

        // Convert the ID to ObjectId
        const objectId = new ObjectId(carId);
        
        // Perform the delete operation
        const response = await mongodb
            .getDatabase()
            .db('carprojects')
            .collection('cars')
            .deleteOne({ _id: objectId });

        if (response.deletedCount > 0) {
            return res.status(204).send(); // No content to return on successful delete
        } else {
            return res.status(404).json({
                message: 'car not found, deletion failed.'
            });
        }
    } catch (err) {
        // Catch any errors that might occur
        console.error('Error during delete operation:', err);
        return res.status(500).json({
            message: err.message || 'An error occurred while deleting the car.'
        });
    }
};



module.exports = {getAll, getsingle,createCar,updateCar,deleteCar};