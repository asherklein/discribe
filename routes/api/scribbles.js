/* eslint-disable linebreak-style */

const Joi = require('joi');
const router = require('express').Router();
const { Scribble, Process } = require('../../models');

const getAllForUser = (model, userId) => model.findAll({ where: { userId } });

const createScribbleSchema = Joi.object({
	actionType: Joi.number().required(),
	lifeCategory: Joi.number().required(),
	emotion: Joi.number().required(),
	liveTime: Joi.date()
		.timestamp()
		.required()
});

/* POST login route */
router.post('/create', (req, res) => {
	const scribbleInput = req.body;
	const result = createScribbleSchema.required().validate(scribbleInput);

	if (result.error) {
		return res.status(422).json({
			errors: result.error
		});
	}

	Scribble.create({ userId: req.user.id, ...result.value })
		.then(_ => getAllForUser(Scribble, req.user.id))
		.then(lst => res.json(lst));
});

router.post('/process', (req, res, next) => {
	const {
		body: { scribble, title }
	} = req;
	// const result = Joi.validate(scribble, createSchema);

	// if(result.error){
	// 	return res.status(422).json({
	// 		errors: result.error
	// 	});
	// }
});

router.get('/list', (req, res) => {
	getAllForUser(Scribble, req.user.id).then(lst => res.json(lst));
});
module.exports = router;
