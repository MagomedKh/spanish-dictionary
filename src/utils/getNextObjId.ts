type GetNextId = <T extends { id: string }>(arr: T[]) => string;

export const getNextObjId: GetNextId = (arr) => {
   if (arr.length === 0) {
      return "0";
   }

   const itemsNumIds = arr.map((item) => parseInt(item.id));
   const nextId = Math.max(...itemsNumIds) + 1;

   return nextId.toString();
};
