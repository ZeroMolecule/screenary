'use client';

import { remoteApi } from '@/domain/remote';
import { getRemoteData } from '@/domain/remote/response/data';

export default async function ClientPage() {
  return (
    <div>
      <h1>Client Page</h1>
      <button
        onClick={async () => {
          const data = await remoteApi
            .get('http://localhost:3000/api/users/me')
            .then(getRemoteData);
          console.log(data);
        }}
      >
        click me to test client fetch
      </button>
    </div>
  );
}
