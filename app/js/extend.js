module.exports = function extend( obj, extension ){
    for ( var key in extension ){
        obj[key] = extension[key];
    }
}
