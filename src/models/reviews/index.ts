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
