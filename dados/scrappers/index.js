const { pinterest } = require('./pinterest.js');

pinterest('Iphone').then(data => {
    console.log(data);
}).catch(err => {
    console.error(err);
});
