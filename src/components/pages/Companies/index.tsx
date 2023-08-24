import { useLazyGetCompaniesQuery } from '@/services/reviews';
import { FIRST_PAGE, PAGE_SIZE } from '@/consts';
import useFilter, { FilterProvider } from '@/hooks/useFilter';
import { CompanyFilter, GetCompaniesResponse } from '@/models/reviews';
import CompaniesTemplate from '@/components/templates/Companies';

export default function CompaniesPage() {
   const [getCompanies, { data, isFetching }] = useLazyGetCompaniesQuery();

   const initialState: CompanyFilter = {
      size: PAGE_SIZE,
      page: FIRST_PAGE,
      name: '',
      orderBy: 'name',
      direction: 'asc',
   };
   const filter = useFilter({
      initialState,
      onChangeState: getCompanies,
   });

   return (
      <FilterProvider filter={filter}>
         <CompaniesTemplate
            data={data ?? ({} as GetCompaniesResponse)}
            isFetching={isFetching}
         />
      </FilterProvider>
   );
}
