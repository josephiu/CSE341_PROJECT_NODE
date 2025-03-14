const { object } = require('webidl-conversions');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db('project1').collection('users').find();
    result.toArray().then((users) => {
        res.setHeader('content-Type', 'application/json');
        res.status(200).json(users);
    });
};

const getsingle = async (req, res) => {
    const userId = new ObjectId (req.params.id);
    const result = await mongodb.getDatabase().db('project1').collection('users').find({_id:userId});
result.toArray().then((users) => {
    res.setHeader('content-Type', 'application/json');
    res.status(200).json(users[0]);
});
};

module.exports = {getAll, getsingle};