import { Campus } from './Campus';
import { Course } from './Course';
import { University } from './University';

export interface Vacancy {
  id: string;
  full_price: number;
  price_with_discount: number;
  discount_percentage: number;
  start_date: string;
  enrollment_semester: string;
  enabled: boolean;
  course: Course;
  university: University;
  campus: Campus;
}
