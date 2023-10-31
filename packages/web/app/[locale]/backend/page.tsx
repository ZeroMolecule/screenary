import { ENV } from '@/env.server';

export default function BackendPage() {
  console.log(ENV.NEXT_PUBLIC_REMOTE_API_BASE_URL);
  fetch(ENV.NEXT_PUBLIC_REMOTE_API_BASE_URL, { cache: 'no-cache' })
    .then((res) => res.json())
    .then((data) => console.log(data));

  return (
    <div>
      <h1>Backend Page</h1>
    </div>
  );
}
