import { Route } from '@react-navigation/native';

import { ProcessStep } from '@/models/processSteps';
import UpdateProcessStepTemplate from '@/components/templates/UpdateProcessStep';
import { useGetOpportunityByIdQuery } from '@/services';
import Loader from '@/components/atoms/Loader';

interface Props {
   // eslint-disable-next-line react/require-default-props
   route?: Route<string, { opportunityId: number; step: ProcessStep }>;
}

export default function UpdateProcessStepPage({ route }: Props) {
   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
   const { opportunityId, step } = route!.params;

   const { data: opportunity, isFetching } =
      useGetOpportunityByIdQuery(opportunityId);

   if (isFetching) return <Loader size={64} />;

   return (
      <UpdateProcessStepTemplate
         availableApplicants={opportunity?.applicants ?? []}
         processStep={step}
      />
   );
}
