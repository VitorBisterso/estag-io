import { logout } from '@/utils';
import Button from '@/components/atoms/Button';

export default function OpportunitiesPage() {
   return <Button label="LOGOUT" onPress={logout} />;
}
