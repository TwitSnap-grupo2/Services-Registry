const getExpiration = () => {
  const now = new Date();
  const expiration = new Date(now);
  expiration.setDate(now.getDate() + 14); // set in two weeks, make it shorter if more security is a must

  return expiration;
};
export default getExpiration;
