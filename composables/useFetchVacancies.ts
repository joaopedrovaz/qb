import { Vacancy } from '~~/types/Vacancy';

export const useFetchVacancies = () => {
  const data = useLazyFetch<Vacancy[]>('http://localhost:3001/vacancies');

  return data;
};
