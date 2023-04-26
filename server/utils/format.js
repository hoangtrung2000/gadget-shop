export const formatMongoDb = (queries) => {
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lte|lt)\b/g,
    (match) => `$${match}`
  );
  const format = JSON.parse(queryString);
  return format;
};
