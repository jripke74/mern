import UsersList from '../components/UsersList';

export default function Users() {
  const USERS = [
    // {
    //   id: 'u1',
    //   name: 'Jeff',
    //   image:
    //     'https://i0.wp.com/picjumbo.com/wp-content/uploads/woman-enjoying-the-sunset-by-the-sea-free-photo.jpg?w=600&quality=80',
    //   places: 3,
    // },
  ];

  return <UsersList items={USERS} />;
}
