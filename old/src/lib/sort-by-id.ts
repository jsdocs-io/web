const sortByID = <T extends { id: string }>(items: T[]): T[] => {
  return items.sort((a, b) => a.id.localeCompare(b.id));
};

export default sortByID;
