import { useGetMyInternshipQuery } from '@/services/internships';
import Loader from '@/components/atoms/Loader';
import MyInternshipTemplate from '@/components/templates/MyInternship';

export default function MyInternshipPage() {
   const { data: internship, isFetching } = useGetMyInternshipQuery(null);

   if (isFetching) return <Loader size={64} />;

   return <MyInternshipTemplate internship={internship} />;
}
