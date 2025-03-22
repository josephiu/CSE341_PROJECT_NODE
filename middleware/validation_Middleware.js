const validator = require('../helpers/validate');



const saveContact = async (req, res, next) => {
    // Define the validation rules
    const validationRule = {
        first_name: "required|string",
        last_name: "required|string", 
        phone: "required|string", 
        email: "required|string|email",
        birthday: "required|string",
        favourite_color: "string"
    };

    try {
        // Use the validator to validate the request body
        await validator(req.body, validationRule);
        next();  // Proceed to the next middleware if validation passes
    } catch (err) {
        // If validation fails, return an error response
        res.status(412).send({
            success: false,
            message: 'Validation failed',
            data: err
        });
    }
};




const saveCar = async (req, res, next) => {
    // Define the validation rules
    const validationRule = {
     Name: "required|string",               // Name is required and should be a string.
    Miles_per_Gallon: "required|numeric",  // Miles_per_Gallon is required and should be a number.
    Cylinders: "required|numeric",         // Cylinders is required and should be a number.
    Displacement: "required|numeric",      // Displacement is required and should be a number.
    Horsepower: "required|numeric",        // Horsepower is required and should be a number.
    Weight_in_lbs: "required|numeric",     // Weight_in_lbs is required and should be a number.
    Acceleration: "required|numeric",      // Acceleration is required and should be a number.
    Year: "required|numeric|min:1900|max:2100",  // Year is required, should be a number, and within a reasonable range.
    Origin: "required|string|in:Nigeria, USA,Europe,Japan"  // Origin is required, should be a string, and can only be one of these values.
    };

    try {
        // Use the validator to validate the request body
        await validator(req.body, validationRule);
        next();  // Proceed to the next middleware if validation passes
    } catch (err) {
        // If validation fails, return an error response
        res.status(412).send({
            success: false,
            message: 'Validation failed',
            data: err
        });
    }
};



const saveGuiter = async (req, res, next) => {
    // Define the validation rules
    const validationRule = {
    name: "required|string",             // name is required and should be a string.
    year: "required|numeric|min:1900|max:2100",  // year is required, should be numeric, and within the reasonable range of 1900-2100.
    country: "required|string",           // country is required and should be a string.
    url: "required|url"                   // url is required and should be a valid URL.

    };

    try {
        // Use the validator to validate the request body
        await validator(req.body, validationRule);
        next();  // Proceed to the next middleware if validation passes
    } catch (err) {
        // If validation fails, return an error response
        res.status(412).send({
            success: false,
            message: 'Validation failed',
            data: err
        });
    }
};










module.exports = { saveContact, saveCar, saveGuiter};