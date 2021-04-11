import { consoleColours } from './console-colours';

export const LoggingUtils = {
  logGreen: (str) => console.log(`${consoleColours.FgGreen}${str}${consoleColours.Reset}`),
  logYellow: (str) => console.log(`${consoleColours.FgYellow}${str}${consoleColours.Reset}`),
  logBlue: (str) => console.log(`${consoleColours.FgCyan}${str}${consoleColours.Reset}`),
  logLoader: () => ((() => {
    const p = ['/', '-', '\\', '|'];
    let x = 0;
    const interval = setInterval(() => {
      process.stdout.write("\r" + consoleColours.FgBlue + p[x++] + `${consoleColours.Reset} `);
      x &= (p.length - 1);
    }, 250);
    const clearLine = () => process.stdout.write("\r");
    return () => {
      clearInterval(interval);
      clearLine();
    }
  })()
  )
}