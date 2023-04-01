import { v4 as uuidv4 } from 'uuid';

function MyComponent() {
  const id = uuidv4();


  return <div>{id}</div>;
}

export default MyComponent;