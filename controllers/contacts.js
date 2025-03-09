const { object } = require('webidl-conversions');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db('contactproject').collection('contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader('content-Type', 'application/json');
        res.status(200).json(contacts);
    });
};

const getsingle = async (req, res) => {
    const contactId = new ObjectId (req.params.id);
    const result = await mongodb.getDatabase().db('contactproject').collection('contacts').find({_id:contactId});
result.toArray().then((contacts) => {
    res.setHeader('content-Type', 'application/json');
    res.status(200).json(contacts[0]);
});
};

module.exports = {getAll, getsingle};