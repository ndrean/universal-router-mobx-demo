const fetchUsers = async () => {
  const query = await fetch("https://reqres.in/api/users?page=1");
  const response = await query.json();
  return response.data;
};

export default fetchUsers;
