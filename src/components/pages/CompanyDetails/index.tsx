import { Route } from '@react-navigation/native';

import { useGetCompanyByIdQuery } from '@/services';
import Loader from '@/components/atoms/Loader';
import { Company } from '@/models/reviews';
import CompanyDetailsTemplate from '@/components/templates/CompanyDetails';

interface Props {
   // eslint-disable-next-line react/require-default-props
   route?: Route<string, { id: number }>;
}

export default function CompanyDetailsPage({ route }: Props) {
   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
   const { id } = route!.params;

   const { data: company, isFetching } = useGetCompanyByIdQuery(id);

   if (isFetching) return <Loader size={64} />;

   return <CompanyDetailsTemplate company={company ?? ({} as Company)} />;
}
