const demo0 = require('./demo-0/main');
const demo1 = require('./demo-1/main');
const demo2 = require('./demo-2/main');
const demo3 = require('./demo-3/main');
const demos = [demo0, demo1, demo2, demo3];

let idx = location.search.substring(1)*1;
demos[idx]();
