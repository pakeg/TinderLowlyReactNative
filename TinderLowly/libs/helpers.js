export const generateId = (id1, id2) => (id1 > id2 ? id1 + id2 : id2 + id1);

export const getMatchedUserInfo = (users, currentUser) => {
  const newUsers = { ...users };
  delete newUsers[currentUser.id];

  const [id, user] = Object.entries(newUsers).flat();

  return { id, ...user };
};
