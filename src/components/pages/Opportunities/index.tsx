import { DEFAULT_DIRECTION, FIRST_PAGE, PAGE_SIZE } from '@/consts';
import useFilter, { FilterProvider } from '@/hooks/useFilter';
import {
   GetOpportunitiesResponse,
   OpportunityFilter as OpportunityFilterType,
} from '@/models/opportunities';
import { useLazyGetOpportunitiesQuery } from '@/services';
import OpportunitiesTemplate from '@/components/templates/Opportunities';

export default function OpportunitiesPage() {
   const [getOpportunities, { data, isFetching }] =
      useLazyGetOpportunitiesQuery();

   const initialState: OpportunityFilterType = {
      size: PAGE_SIZE,
      page: FIRST_PAGE,
      title: '',
      type: undefined,
      weeklyWorkload: undefined,
      orderBy: 'title',
      direction: DEFAULT_DIRECTION,
   };
   const filter = useFilter({
      initialState,
      onChangeState: getOpportunities,
   });

   return (
      <FilterProvider filter={filter}>
         <OpportunitiesTemplate
            data={data ?? ({} as GetOpportunitiesResponse)}
            isFetching={isFetching}
         />
      </FilterProvider>
   );
}
