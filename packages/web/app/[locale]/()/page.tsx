import { withPrivatePage } from '@/app/_hoc/with-private-page';
import ClientHomePage from './_client-page';

function HomePage() {
  return <ClientHomePage />;
}

export default withPrivatePage(HomePage);
