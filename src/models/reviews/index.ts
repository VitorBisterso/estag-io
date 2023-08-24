import { Filters } from '../filters';

export interface Review {
   id: number;
   description: string;
   rating: number;
   createdAt: string;
}

export interface ReviewFilter extends Filters<Review> {
   description?: string;
}

export interface GetReviewsResponse {
   list: Array<Review>;
   count: number;
}

export interface Company {
   id: number;
   name: string;
   phone: string;
   rating: number;
   reviews?: Array<Review>;
}

export interface CompanyFilter extends Filters<Company> {
   name?: string;
}

export interface GetCompaniesResponse {
   list: Array<Company>;
   count: number;
}

export interface CreateReviewParams {
   companyId: number;
   description: string;
   rating: number;
}
