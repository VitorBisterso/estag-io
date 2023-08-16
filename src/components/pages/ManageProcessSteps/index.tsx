import { Route } from '@react-navigation/native';

import { useGetProcessStepsQuery } from '@/services/processSteps';
import Loader from '@/components/atoms/Loader';
import ManageProcessStepsTemplate from '@/components/templates/ManageProcessSteps';

interface Props {
   // eslint-disable-next-line react/require-default-props
   route?: Route<string, { id: number; title: string }>;
}

export default function ManageProcessStepsPage({ route }: Props) {
   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
   const { id, title } = route!.params;

   const { data: processSteps, isFetching } = useGetProcessStepsQuery(id);

   if (isFetching) return <Loader size={64} />;

   return (
      <ManageProcessStepsTemplate
         opportunityId={id}
         opportunityTitle={title}
         processSteps={processSteps ?? []}
      />
   );
}
