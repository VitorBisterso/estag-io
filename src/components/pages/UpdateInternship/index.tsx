import { Route } from '@react-navigation/native';

import Loader from '@/components/atoms/Loader';
import {
   useGetInternshipByIdQuery,
   useGetSimplifiedOpportunitiesQuery,
} from '@/services';
import { Internship } from '@/models/internships';
import UpdateInternshipTemplate from '@/components/templates/UpdateInternship';

interface Props {
   // eslint-disable-next-line react/require-default-props
   route?: Route<string, { id: number }>;
}

export default function UpdateInternshipPage({ route }: Props) {
   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
   const { id } = route!.params;
   const { data: internship, isFetching } = useGetInternshipByIdQuery(id);
   const { data: opportunities, isFetching: isFetchingOpportunities } =
      useGetSimplifiedOpportunitiesQuery(null);

   if (
      isFetching ||
      Object.keys(internship ?? {}).length <= 0 ||
      isFetchingOpportunities
   )
      return <Loader size={64} />;

   return (
      <UpdateInternshipTemplate
         internship={internship ?? ({} as Internship)}
         opportunities={opportunities ?? []}
      />
   );
}
