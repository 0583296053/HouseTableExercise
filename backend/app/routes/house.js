const express = require('express');
const { processHouseAction, HouseActions } = require('../controllers');

const router = express.Router();

router.post('', async (req, res) => {
  await processHouseAction(req, res, HouseActions.Create);
})

router.get('/:id', async (req, res) => {
  await processHouseAction(req, res, HouseActions.Get);
})

router.put('/:id', async (req, res) => {
  await processHouseAction(req, res, HouseActions.Update);
})

module.exports = router;

