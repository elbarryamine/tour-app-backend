import Joi from 'joi';
export function validateTour(tour: any) {
	const schema = Joi.object({
		name: Joi.string().min(3).max(255).required().alphanum(),
		duration: Joi.string().min(1).max(255).required().alphanum(),
		description: Joi.string().min(3).required().alphanum(),
		price: Joi.string().min(3).required().alphanum(),
		discount: Joi.string().required().alphanum(),
		location: Joi.array().items(Joi.string()),
		features: Joi.array().items(Joi.string()),
		rating: Joi.number().min(1).max(5),
		category: Joi.array().items(Joi.string()),
	});
	const result = schema.validate(tour);
	if (result.error || result.warning) {
		return false;
	} else {
		return true;
	}
}

export function validateUserSignUp(user: any) {
	const schema = Joi.object({
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		email: Joi.string().required(),
		phone: Joi.string(),
		password: Joi.string().required(),
		passwordConfirm: Joi.string().required(),
		birthDate: Joi.string().required(),
	});
	const result = schema.validate(user);
	if (result.error || result.warning) {
		return false;
	} else {
		return true;
	}
}
