export type UserSignUpType = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	password: string;
	passwordConfirm: string;
	birthDate: string;
	avatar: string;
};

export type UserSignInType = {
	email: string;
	password: string;
};
