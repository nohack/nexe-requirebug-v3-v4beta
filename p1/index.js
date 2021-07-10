var fs     = require('fs');
var path   = require("path");

/**
 * Reads files from a given directory synchronously and \
 *     returns and array of stat objects
 * @param {string} dirName the name of the directory
 * @return {array} list of stats of files
 */
function readdirSync(dirName) {
    const files = []
    fs.readdirSync(dirName)
        .forEach(function(name) {
            var stat = fs.statSync(path.join(dirName, name));
        	files.push({name, stat});
        });
    return files;
}
var adapters = [];

readdirSync(__dirname)
.filter(function(file) {
        return (file.stat.isFile()) && (file.name !== "index.js");
})
.forEach(function(file) {
        adapters.push(require(path.join(__dirname, file.name)));
});

