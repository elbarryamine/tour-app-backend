export type TourArgsInterface = {
	id: string;
	name: string;
	category: string;
	rating: number;
	location: string;
	duration: string;
	description: string;
	features: string;
	price: string;
	discount: string;
	mainImage: string;
	images: string;
};
export type CreateTourArgsInterface = {
	name: string;
	category: string;
	rating: number;
	location: string;
	duration: string;
	description: string;
	features: string;
	price: string;
	discount: string;
	mainImage: string;
	images: string;
	createdBy: string;
};
export type TourSearchArgsInterface = {
	search: string;
	type: string;
	priceRangeMin: string;
	priceRangeMax: string;
	date: string;
	duration: string;
};
export type DeleteTourArgsInterface = {
	id: string;
};
