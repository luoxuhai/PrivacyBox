import isJSON from 'validator/es/lib/isJSON';

console.prettyLog = (message, ...optionalParams) => {
  const space = 2;
  const messages: any[] = [message, ...optionalParams];

  const prettyMessages = messages.map((msg) => {
    if (typeof message === 'object') {
      return JSON.stringify(message, null, space);
    } else if (isJSON(message ?? '')) {
      return JSON.stringify(JSON.parse(message), null, space);
    } else {
      return msg;
    }
  });

  console.log(...prettyMessages);
};
