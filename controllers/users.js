const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async(req, res) => {
  /**
   * #swagger.tags = ['Users']
   * #swagger.summary = "Get all users"
   */
    const result = await mongodb.getDatabase().db().collection('users').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
};

const getSingle = async(req, res) => {
  /**
   * #swagger.tags = ['Users']
   * #swagger.summary = "Get a single user using their id"
   * #swagger.description = "If you don't know the user ID, search for the user in ' GET ( Get all users ) '."

   */
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('users').find({ _id: userId });
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    });
};

const createUser = async (req, res) => {
    /**
     * #swagger.tags = ['Users']
    * #swagger.summary = "Add a user"
    * #swagger.description = "Add user information in the provided body template, user ID is created automatically."

    */
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  const response = await mongodb.getDatabase().db().collection('users').insertOne(user);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the user.');
  }
};

const updateUser = async (req, res) => {
    /**
     * #swagger.tags = ['Users']
     * #swagger.summary = "Change user information"
     * #swagger.description = "Enter the user ID and any necessary changes. If you don't know the user ID, search for the user in ' GET ( Get all users ) '."
     */
    const userId = new ObjectId(req.params.id);
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('users').replaceOne({ _id: userId }, user);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the user.');
    }
  };


  const deleteUser = async (req, res) => {
    /**
     * #swagger.tags = ['Users']
     * #swagger.summary = "Delete a user"
     * #swagger.description = "WARNING: The user will be permanently removed from the database."
     */
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the user.');
    }
  };

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};