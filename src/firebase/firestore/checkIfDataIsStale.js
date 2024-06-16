export const checkIfDataIsStale = (timestamp) => {
  if (!timestamp) return true;
  const savedTime = new Date(timestamp);
  const currentTime = new Date();
  const differenceInDays = (currentTime - savedTime) / (1000 * 60 * 60 * 24);
  return differenceInDays > 1;
};
