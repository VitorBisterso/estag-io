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

export type BusinessCategory =
   | 'AUTOMOTIVE'
   | 'BANK'
   | 'CONSUMER_GOODS'
   | 'FOOD_AND_BEVERAGES'
   | 'EDUCATION'
   | 'CONSTRUCTION_COMPANY'
   | 'PHARMACEUTICAL_AND_CHEMICALS'
   | 'HOSPITAL_AND_HEALTH_PLAN'
   | 'INDUSTRY'
   | 'LOGISTICS'
   | 'MEDIA_AND_ADVERTISING'
   | 'NGO'
   | 'OIL_ENERGY_AND_ENVIRONMENTAL'
   | 'HEALTH_AND_WELL_BEING'
   | 'INSURANCE_COMPANY'
   | 'FINANCIAL_SERVICES'
   | 'RETAIL'
   | 'IT_AND_TELECOMMUNICATIONS';

export interface Company {
   id: number;
   name: string;
   phone: string;
   rating: number;
   businessCategory: BusinessCategory;
   reviewCount?: number;
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

export type GetBusinessCategoriesResponse = Array<{
   label: string;
   value: BusinessCategory;
}>;
