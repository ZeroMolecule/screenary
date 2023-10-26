export default function ServerPage() {
  fetch('https://jsonplaceholder.typicode.com/todos/1').then((response) => {
    throw new Error('profile page error from server 01');
  });

  return (
    <div>
      <h1>Server Page</h1>
    </div>
  );
}
