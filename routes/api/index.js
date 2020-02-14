/**
 *
 * Author:  AppSeed.us
 *
 * License: MIT - Copyright (c) AppSeed.us
 * @link https://github.com/app-generator/nodejs-starter
 *
 */

const express = require('express');
const router = express.Router();
const auth = require('../auth')  

router.use('/users', require('./users'));
router.use('/scribbles', auth.required, require('./scribbles'));

module.exports = router;
