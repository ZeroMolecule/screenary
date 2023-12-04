import { getServerSession } from 'next-auth';
import { authOptions } from '@/domain/auth';
import { withPrivatePage } from '@/app/_hoc/with-private-page';
import { Title } from '@/app/_components/base/title';
import { PageContainer } from '@/app/_components/page-container';
import { NotificationsWidget } from '@/app/_components/notifications-widget';

async function InboxPage() {
  const { username } = await useInboxPage();

  return (
    <>
      <PageContainer>
        <Title>Inbox Page</Title>
      </PageContainer>
      <NotificationsWidget username={username} />
    </>
  );
}

async function useInboxPage() {
  const session = await getServerSession(authOptions);

  return { username: session?.user?.name };
}

export default withPrivatePage(InboxPage);
