const db = require('../database/models');
const { NotFoundError } = require('./helpers/helpers');
const { riskCalculation } = require('./helpers/riskCalculation');

const HouseModel = db.House;

const HouseActions = {
  Create: 'create',
  Get: 'get',
  Update: 'update'
};

class House {
  async create(body) {
    let data;
    try {
      const { address, currentValue, loanAmount } = body;

      // Calculate risk
      const risk = riskCalculation(currentValue, loanAmount);

      // Create a new house object
      const newHouse = { address, currentValue, loanAmount, risk };

      // Save the house object in the database
      data = await HouseModel.create(newHouse);
    } catch (err) {
      throw new Error(`An error occurred while creating a new house: ${err.message}`);
    }

    return {
      status: 'OK',
      message: 'Success creating a new house',
      data
    };
  }

  async get(id) {
    let data;

    // Find house in the database
    try {
      data = await HouseModel.findByPk(id);
    } catch (err) {
      throw new Error(`Error retrieving house with id=${id}: ${err.message}`);
    }

    // Throw an 404 error if not found house
    if (!data) {
      throw new NotFoundError(`Cannot find house with id=${id}.`);
    }

    return {
      status: 'OK',
      data
    };
  }

  async update(id, body) {
    try {
      // Throw an error if there is no fields to update
      if (!Object.keys(body).length) {
        throw new Error(`There is no fields to update`);
      }

      const { address, currentValue, loanAmount } = body;

      // Prepare the update fields
      const updates = { address, currentValue, loanAmount };
      Object.keys(updates).forEach(updateKey => {
        if (updateKey === undefined) {
          delete updates[updateKey];
        }
      });

      // Recalculate risk if `currentValue` or `loanAmount` are updated
      if (updates.currentValue || updates.loanAmount) {
        updates.risk = riskCalculation(currentValue, loanAmount);
      }

      // Update house in the database
      const data = await HouseModel.update(updates, { where: { id } });
      if (data[0] !== 1) {
        throw new Error('Cannot update HouseModel');
      }
    } catch (err) {
      throw new Error(`Error updating house with id=${id}: ${err.message}`);
    }

    return {
      status: 'OK',
      message: `Success updating house with id=${id}`
    };
  }
}

const processHouseAction = async (req, res, action) => {
  let result;
  try {
    const { params: { id }, body } = req;

    const house = new House();

    // Call the needed function by the action type
    switch (action) {
      case HouseActions.Create:
        result = await house.create(body);
        break;

      case HouseActions.Get:
        result = await house.get(id);
        break;

      case HouseActions.Update:
        result = await house.update(id, body);
        break;

      default:
        throw new Error(`Unexpected action ${action}`);
    }
  } catch (err) {
    const errMsg = `There is an error: ${err.message}`;
    console.log(errMsg);

    // Send the result if was an error
    const status = err instanceof NotFoundError ? 404 : 500;
    res.status(status).send(errMsg);
  }

  // Send the result if all success
  res.send(result);
};

module.exports = {
  HouseActions,
  processHouseAction
};
