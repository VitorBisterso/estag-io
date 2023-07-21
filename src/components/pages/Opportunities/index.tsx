import { useTranslation } from 'react-i18next';

import PageHeader from '@/components/molecules/PageHeader';
import { OPPORTUNITIES_ICON } from '@/consts';

export default function OpportunitiesPage() {
   const { t } = useTranslation('opportunities');

   return <PageHeader title={t('header.title')} icon={OPPORTUNITIES_ICON} />;
}
