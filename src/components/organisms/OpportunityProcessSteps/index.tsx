import { useSelector } from 'react-redux';
import { Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import { useGetProcessStepsQuery } from '@/services/processSteps';
import Loader from '@/components/atoms/Loader';
import { RootState } from '@/store';
import ProcessStepList from '../ProcessStepList';
import ProcessStepTimeline from '../ProcessStepTimeline';
import styles from './styles';

interface Props {
   id: number;
   isApplied: boolean;
}

export default function OpportunityProcessSteps({ id, isApplied }: Props) {
   const { t } = useTranslation('processSteps');
   const { profile } = useSelector((state: RootState) => state.ProfileSlice);
   const { data: processSteps, isFetching } = useGetProcessStepsQuery(id);

   if (isFetching) return <Loader size={64} />;

   if (processSteps && processSteps.length <= 0)
      return <Text style={styles.emptySteps}>{t('labels.empty.steps')}</Text>;

   if (profile === 'USER' && isApplied)
      return <ProcessStepTimeline processSteps={processSteps ?? []} />;

   return (
      <ProcessStepList opportunityId={id} processSteps={processSteps ?? []} />
   );
}
