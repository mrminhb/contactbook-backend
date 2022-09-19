const ContactService = require("../services/contact.service");
const ApiError = require('../api-error');

//create new contact
exports.create = async (req, res, next) => {
    if(!req.body?.name) {
        return next(new ApiError(400, 'Name cannot be empty'))
    }

    try {
        const contactService = new ContactService();
        const contact = await contactService.create(req.body);
        return res.send(contact);

    } catch(err) {
        console.log(err);
        return next(
            new ApiError(500, 'An error occured while creating the contact')
        )
    }
}

//retrive all contacts of a user from the database
exports.findALl = async (req, res, next) => {
    let contacts = [];

    try {
        const contactService = new ContactService();
        const { name } =  req.query;

        if (name) {
            contacts = await contactService.findByName(name)
        } else {
            contacts = await contactService.all()
        }

    } catch(err) {
        console.log(err);
        return next(
            new ApiError(500, 'An error occured while creating the contact')
        )
    }

    return res.send(contacts)
}

exports.findOne = async (req, res, next) => {
    try {
        const contactService = new ContactService();
        const contact = await contactService.findById(req.params.id);
        if (!contact) {
            return next(new ApiError(404, 'Contact not found'))
        }
    } catch(err) {
        console.log(err);
        return next(
            new ApiError(500, 'An error occured while creating the contact')
        )
    }
}

exports.update = (req, res) => {
    return res.send({message: 'update handler'});
}

exports.delete = (req, res) => {
    return res.send({message: 'delete handler'});
}

exports.deleteAll = (req, res) => {
    return res.send({message: 'deleteAll handler'});
}

exports.findAllFavorite = (req, res) => {
    return res.send({message: 'findAllFavorite handler'});
}