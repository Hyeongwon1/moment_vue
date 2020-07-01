import express from 'express'
import {
  gett
} from '../../controllers/v1/user.controller'

const router = express.Router()

router.route('/:uuid?').get(
    gett
  );

module.exports = router;
