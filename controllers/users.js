// const { object } = require('webidl-conversions');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
     //#swagger.tags = ['Users']
    const result = await mongodb.getDatabase().db('project1').collection('users').find();
    result.toArray().then((users) => {
        res.setHeader('content-Type', 'application/json');
        res.status(200).json(users);
    });
};

const getsingle = async (req, res) => {
     //#swagger.tags = ['Users']
    const userId = new ObjectId (req.params.id);
    const result = await mongodb.getDatabase().db('project1').collection('users').find({_id: userId});
result.toArray().then((users) => {
    res.setHeader('content-Type', 'application/json');
    res.status(200).json(users[0]);
});
};

const createUser = async(req, res) => {
     //#swagger.tags = ['Users']
    const user = {
        last_name: req.body.last_name,
        email: req.body.email,      
        gender: req.body.gender,
        ip_address: req.body.ip_address

    };
    const response = await mongodb.getDatabase().db('project1').collection('users').insertOne(user);
    if (response.acknowledged) {
        res.status (204).send();
    } else {
        res.status(500).json(response.error || 'some error occured while updating the user.');
    }
};

const updateUser = async(req, res) => {
     //#swagger.tags = ['Users']
    const userId = new ObjectId (req.params.id);
    const user = {
        last_name: req.body.last_name,
        email: req.body.email,      
        gender: req.body.gender,
        ip_address: req.body.ip_address
        
    };
    const response = await mongodb.getDatabase().db('project1').collection('users').replaceOne({_id: userId}, user);
    if (response.modifiedCount > 0) {
        res.status (204).send();
    } else {
        res.status(500).json(response.error || 'some error occured while updating the user.');
    }

};


const deleteUser = async(req, res) => {
    //swagger.tags = ['Users']

    const userId = new ObjectId (req.params.id);    
    const response = await mongodb.getDatabase().db('project1').collection('users').deleteOne({_id: userId});
    if (response.deletedCount > 0) {
        res.status (204).send();
    } else {
        res.status(500).json(response.error || 'some error occured while updating the user.');
    }

};





module.exports = {getAll, getsingle, createUser, updateUser, deleteUser};
// module.exports = {getAll, getsingle};
