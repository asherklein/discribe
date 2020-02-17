/* eslint-disable linebreak-style */

const Joi = require('joi');
const router = require('express').Router();
const { Scribble, Process } = require('../../models');

Scribble.hasOne(Process);
const getAllForUser = (model, userId) => model.findAll({ where: { userId } });
const getAllScribbles = userId =>
	Scribble.findAll({
		where: { userId },
		include: [{ model: Process }]
	});

const createScribbleSchema = Joi.object({
	actionType: Joi.number().required(),
	lifeCategory: Joi.number().required(),
	emotion: Joi.number().required(),
	liveTime: Joi.date()
		.timestamp()
		.required()
});

const processScribbleSchema = Joi.object({
	scribbleId: Joi.number().required(),
	title: Joi.string().required(),
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
		.then(_ => getAllScribbles(req.user.id))
		.then(lst => res.json(lst));
});

router.post('/process', (req, res, next) => {
	const processData = req.body;
	const result = processScribbleSchema.required().validate(processData);

	if (result.error) {
		return res.status(422).json({
			errors: result.error
		});
	}

	Process.create(result.value)
		.then(_ => getAllScribbles(req.user.id))
		.then(lst => res.json(lst));
});

router.get('/list', (req, res) => {
	getAllScribbles(req.user.id).then(lst => res.json(lst));
});
module.exports = router;
