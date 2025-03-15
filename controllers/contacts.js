const { object } = require('webidl-conversions');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags = ['contacts']
    const result = await mongodb.getDatabase().db('contactproject').collection('contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader('content-Type', 'application/json');
        res.status(200).json(contacts);
    });
};

const getsingle = async (req, res) => {
    //#swagger.tags = ['contacts']
    const contactId = new ObjectId (req.params.id);
    const result = await mongodb.getDatabase().db('contactproject').collection('contacts').find({_id:contactId});
result.toArray().then((contacts) => {
    res.setHeader('content-Type', 'application/json');
    res.status(200).json(contacts[0]);
});
};

const createContact = async(req, res) => {
     //#swagger.tags = ['contacts']
    const contact = {
        first_name: req.body.last_name,
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
    const contactId = new ObjectId (req.params.id);
    const contact = {
        first_name: req.body.last_name,
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


const deleteContact = async(req, res) => {
        //#swagger.tags = ['contacts']

    const contactId = new ObjectId (req.params.id);    
    const response = await mongodb.getDatabase().db('contactproject').collection('contacts').deleteOne({_id: contactId});
    if (response.deletedCount > 0) {
        res.status (204).send();
    } else {
        res.status(500).json(response.error || 'some error occured while Deleting the contact.');
    }

};




module.exports = {getAll, getsingle,createContact,updateContact,deleteContact};