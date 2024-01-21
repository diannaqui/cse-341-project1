const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async(req, res) => {
  /**
   * #swagger.tags = ['Contacts']
   * #swagger.summary = "Get all Contacts"
   */
    const result = await mongodb.getDatabase().db().collection('contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    });
};

const getSingle = async(req, res) => {
  /**
   * #swagger.tags = ['Contacts']
   * #swagger.summary = "Get a single contact using their id"
   * #swagger.description = "If you don't know the contact ID, search for the contact in ' GET ( Get all Contacts ) '."

   */
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('contacts').find({ _id: contactId });
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    });
};

const createContact = async (req, res) => {
    /**
     * #swagger.tags = ['Contacts']
    * #swagger.summary = "Add a contact"
    * #swagger.description = "Add contact information in the provided body template, contact ID is created automatically."

    */
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  const response = await mongodb.getDatabase().db().collection('contacts').insertOne(contact);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }
};

const updateContact = async (req, res) => {
    /**
     * #swagger.tags = ['Contacts']
     * #swagger.summary = "Change Contact information"
     * #swagger.description = "Enter the contact ID and any necessary changes. If you don't know the contact ID, search for the contact in ' GET ( Get all contacts ) '."
     */
    const contactId = new ObjectId(req.params.id);
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('contacts').replaceOne({ _id: contactId }, contact);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the contact.');
    }
  };


  const deleteContact = async (req, res) => {
    /**
     * #swagger.tags = ['Contacts']
     * #swagger.summary = "Delete a contact"
     * #swagger.description = "WARNING: The contact will be permanently removed from the database."
     */
    const contactId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('contacts').deleteOne({ _id: contactId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
    }
  };

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};