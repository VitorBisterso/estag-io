import { useGetProcessStepsQuery } from '@/services/processSteps';
import Loader from '@/components/atoms/Loader';
import ProcessStepList from '../ProcessStepList';

interface Props {
   id: number;
}

export default function OpportunityProcessSteps({ id }: Props) {
   const { data: processSteps, isFetching } = useGetProcessStepsQuery(id);

   if (isFetching) return <Loader size={64} />;

   return <ProcessStepList processSteps={processSteps ?? []} />;
}
