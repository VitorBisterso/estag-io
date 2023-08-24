import { Route } from '@react-navigation/native';

import { Internship } from '@/models/internships';
import InternshipDetailsTemplate from '@/components/templates/InternshipDetails';

interface Props {
   // eslint-disable-next-line react/require-default-props
   route?: Route<string, { internship: Internship }>;
}

export default function InternshipDetailsPage({ route }: Props) {
   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
   const { internship } = route!.params;

   return <InternshipDetailsTemplate internship={internship} />;
}
