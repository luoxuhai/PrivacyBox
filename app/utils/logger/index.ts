console.print = (message) => {
  if (typeof message === 'object') {
    console.log(JSON.stringify(message, null, 2));
  }

  console.log(message);
};
