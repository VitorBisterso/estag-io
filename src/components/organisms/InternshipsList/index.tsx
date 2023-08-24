import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import EmptyResults from '@/components/atoms/EmptyResults';
import Loader from '@/components/atoms/Loader';
import { useFilterContext } from '@/hooks/useFilter';
import { Internship, InternshipFilter } from '@/models/internships';
import Pagination from '@/components/molecules/Pagination';
import InternshipCard from '@/components/molecules/InternshipCard';
import { INTERNSHIP_DETAILS_PAGE } from '@/consts';
import styles from './styles';

interface Props {
   internships: Array<Internship>;
   count: number;
   isLoading: boolean;
}

export default function InternshipsList({
   internships,
   count,
   isLoading,
}: Props) {
   const navigation = useNavigation<any>();
   const { state, set } = useFilterContext<InternshipFilter>();

   if (isLoading) return <Loader size={64} />;

   if (internships && internships.length <= 0) return <EmptyResults />;

   const { page, size } = state;
   return (
      <>
         {internships.map((internship) => (
            <InternshipCard
               key={internship.id}
               internship={internship}
               onPress={() =>
                  navigation.navigate(INTERNSHIP_DETAILS_PAGE, { internship })
               }
            />
         ))}
         <View style={styles.pagination}>
            <Pagination
               currentPage={page}
               pageSize={size}
               itemsCount={count}
               onChange={(newPageNumber) => set({ page: newPageNumber })}
            />
         </View>
      </>
   );
}
