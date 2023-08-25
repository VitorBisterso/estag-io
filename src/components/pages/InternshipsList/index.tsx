import InternshipsListTemplate from '@/components/templates/InternshipsList';
import { DEFAULT_DIRECTION, FIRST_PAGE, PAGE_SIZE } from '@/consts';
import useFilter, { FilterProvider } from '@/hooks/useFilter';
import { GetInternshipsResponse, InternshipFilter } from '@/models/internships';
import { useLazyGetInternshipsQuery } from '@/services';

export default function InternshipsListPage() {
   const [getInternships, { data, isFetching }] = useLazyGetInternshipsQuery();

   const initialState: InternshipFilter = {
      size: PAGE_SIZE,
      page: FIRST_PAGE,
      internName: '',
      type: undefined,
      weeklyWorkload: undefined,
      orderBy: 'until',
      direction: DEFAULT_DIRECTION,
   };
   const filter = useFilter({
      initialState,
      onChangeState: getInternships,
   });

   return (
      <FilterProvider filter={filter}>
         <InternshipsListTemplate
            data={data ?? ({} as GetInternshipsResponse)}
            isFetching={isFetching}
         />
      </FilterProvider>
   );
}
