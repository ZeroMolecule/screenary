export default function ServerPage() {
  fetch('https://jsonplaceholder.typicode.com/todos/1').then((response) => {
    throw new Error('server error thrown 01');
  });

  return (
    <div>
      <h1>Server Page</h1>
    </div>
  );
}
