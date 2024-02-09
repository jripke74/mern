import UserItem from './UserItem';
import './UsersList.css';

export default function UsersList({ items }) {
  if (items.length === 0) {
    return (
      <div className="center">
        <h2>No users foind.</h2>
      </div>
    );
  }

  return (
    <ul>
      {items.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          placeCount={user.places}
        />
      ))}
    </ul>
  );
}
