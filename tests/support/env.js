/*
This file is used to specify default timeout in milliseconds for cucumber steps
In order to make value readable use following structure:
minutes - x * 60 * 1000
seconds - x * 1000
where x is timeout Value
*/
const {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(3 * 60 * 1000);