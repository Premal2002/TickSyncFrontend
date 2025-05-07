export const formatDate = (date: Date, options: any) => {
  return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
};
