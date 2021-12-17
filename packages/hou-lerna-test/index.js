const _  = require('lodash');
console.log('hou-lerna-test:',_.VERSION)
module.exports = {
    test () {
      console.log('~~~~hou-lerna-test');
    }
}