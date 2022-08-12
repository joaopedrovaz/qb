import { Vacancy } from '~~/types/Vacancy';
import { Ref } from 'vue';

export const useFetchVacancies = (queryFilters?: string | Ref<string>) => {
  // useLazyFetch<Vacancy[]>(`http://localhost:3001/vacancies?${queryString.stringify(id.value)}`);
  const result = ref<Vacancy[] | null>(null);

  const reload = async () => {
    const res = await fetch(`http://localhost:3001/vacancies?${unref(queryFilters)}`);
    const data = await res.json();
    result.value = data;
  };

  if (isRef(queryFilters)) { // if url is reactive
    watch(queryFilters, reload);
  }

  reload();

  return {
    result,
    reload,
  };
};
