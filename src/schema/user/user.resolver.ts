import { UserSignInType, UserSignUpType } from './user.interfaces';
import knex from '../../services/knex';
import { validateUserSignUp } from '../../services/functions/validate';
import bycrpt from 'bcrypt';
import { Knex } from 'knex';
import { errors } from '../../services/errors';

type PropertiesOptional = Pick<Partial<UserSignUpType>, 'passwordConfirm'>;
type WithoutPassConfirm = Omit<UserSignInType, 'passwordConfirm'>;
type FormData = PropertiesOptional & WithoutPassConfirm;
export async function signUpUser(_: any, args: UserSignUpType, ctx: any) {
	try {
		if (
			!validateUserSignUp(args) ||
			args.password !== args.passwordConfirm
		) {
			throw new Error('Invalid Data');
		}
		const response = await knex('user')
			.where('email', '=', args.email)
			.catch((err) => {
				throw new Error(err);
			});
		const isUserWithSameEmailExist = response.length ? true : false;
		if (isUserWithSameEmailExist)
			throw new Error(errors.user_with_same_email_exist);
		const user: FormData = { ...args };
		delete user.passwordConfirm;
		const hashedPassword = await bycrpt.hash(user.password, 10);
		knex('user')
			.insert({
				...user,
				avatar: '',
				password: hashedPassword,
			})
			.catch((err) => {
				throw new Error(err);
			});
		return true;
	} catch (e: any) {
		throw new Error(e.message || errors.something_went_wrong);
	}
}
export async function logInUser(_: any, args: UserSignInType, ctx: any) {
	// look for provided username in db
	try {
		return await knex.transaction(
			async (trx: Knex.Transaction<UserSignInType, any[]>) => {
				const user = await trx('user')
					.where('email', '=', args.email)
					.first();
				if (!user) {
					throw new Error(errors.wrong_email_or_password);
				}
				const isValidPassword = await bycrpt.compare(
					args.password,
					user.password
				);
				if (!isValidPassword) {
					throw new Error(errors.wrong_email_or_password);
				}
				return 'token';
			}
		);
	} catch (e: any) {
		throw new Error(e.message || errors.something_went_wrong);
	}
	// compare password
	// generate and send token
}
