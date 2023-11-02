import { remoteApi } from '@/domain/remote';
import { getRemoteData } from '@/domain/remote/response/data';

export default async function ServerPage() {
  const data = await remoteApi
    .get('http://localhost:3000/api/users/me')
    .then(getRemoteData);
  console.log({ data });

  return (
    <div>
      <h1>Server Page</h1>
    </div>
  );
}
