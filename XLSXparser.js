'use strict'


let fs = require('fs');
let xlsx = require('node-xlsx').default;

module.exports = XLSXparser;

function XLSXparser() {
}

XLSXparser.prototype.create =  function (data) {
    let buffer = xlsx.build([{name: 'students', data: data}]);
    fs.writeFileSync('students_yezi_2.xlsx', buffer, 'binary');
};


