'use client';

export default function ClientPage() {
  return (
    <div>
      <h1>Client Page</h1>
      <button
        onClick={() => {
          throw new Error('client error thrown 01');
        }}
      >
        click me to throw client error
      </button>
    </div>
  );
}
