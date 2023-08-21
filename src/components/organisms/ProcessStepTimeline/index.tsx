import { ProcessStep } from '@/models/processSteps';
import SimplifiedView from '../ProcessStepList/simplified';

interface Props {
   processSteps: Array<ProcessStep>;
}

export default function ProcessStepTimeline({ processSteps }: Props) {
   return <SimplifiedView processSteps={processSteps} timeline />;
}
