'use client';

export default function AboutPage() {
  return (
    <div>
      <h1>About Page</h1>
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
