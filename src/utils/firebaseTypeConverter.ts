// const converter = <T>() => ({
//    toFirestore: (data: Partial<T>) => data,
//    fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) =>
//       snap.data() as T,
// });

// const dataPoint = <T>(collectionPath: string) =>
//    firestor().collection(collectionPath).withConverter(converter<T>());
