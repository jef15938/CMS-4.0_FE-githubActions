var fs = require('fs');

function getArgs() {
  const args = {};
  process.argv
    .slice(2, process.argv.length)
    .forEach(arg => {
      // long arg
      if (arg.slice(0, 2) === '--') {
        const longArg = arg.split('=');
        const longArgFlag = longArg[0].slice(2, longArg[0].length);
        const longArgValue = longArg.length > 1 ? longArg[1] : true;
        args[longArgFlag] = longArgValue;
      }
      // flags
      else if (arg[0] === '-') {
        const flags = arg.slice(1, arg.length).split('');
        flags.forEach(flag => {
          args[flag] = true;
        });
      }
    });
  return args;
}

const args = getArgs();
const siteId = args.site;
if (!siteId) { throw 'no site arg, use --site={{siteId}}'; }

fs.readFile(`${__dirname}/index.html`, function (err, data) {
  if (err) { throw err; }
  const baseHrefStringRegex = new RegExp(/<base href=\"\/\">/g);
  const htmlString = data.toString().replace(baseHrefStringRegex, `<base href="/${siteId ? siteId + '/' : ''}">`);
  fs.writeFile(`${__dirname}/index-${siteId}.html`, htmlString, function (err) {
    if (err) {
      console.log(`Write index-${siteId}.html Success`);
      console.log(err);
      return;
    }

    console.log(`Write index-${siteId}.html Success`);
  })
});