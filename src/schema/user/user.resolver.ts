import { UserSignInType } from './user.types';
import knex from '../../db';
import { validateUserSignUp } from '../../functions/validate';
import bycrpt from 'bcrypt';

type PropertiesOptional = Pick<Partial<UserSignInType>, 'passwordConfirm'>;
type WithoutPassConfirm = Omit<UserSignInType, 'passwordConfirm'>;
type FormData = PropertiesOptional & WithoutPassConfirm;
export async function signUpUser(_: any, args: UserSignInType, ctx: any) {
	if (validateUserSignUp(args) && args.password === args.passwordConfirm) {
		const formData: FormData = { ...args };
		delete formData.passwordConfirm;
		const hashedPassword = await bycrpt.hash(formData.password, 10);
		knex
			.transaction(async (trx) => {
				trx('user').insert({ ...args, password: hashedPassword });
			})
			.catch(() => {
				throw new Error('Something Went Wrong');
			});
		return true;
	} else {
		throw new Error('Invalid Data');
	}
}
export async function signInUser(_: any, args: UserSignInType, ctx: any) {}
