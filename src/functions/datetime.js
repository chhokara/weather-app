// function to acquire the day and 24 hour time
export const datetime = (dt) => {
  const date = new Date(dt * 1000);
  const options = { weekday: "long" };
  const day = new Intl.DateTimeFormat("en-US", options).format(date);
  const dateTime = day + ", " + date.getHours() + ":" + date.getMinutes();
  return dateTime;
};
