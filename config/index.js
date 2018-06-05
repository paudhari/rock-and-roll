/**
 * Created by IMFCORP\mohanpratap.singh on 19/12/16.
 */
var path =  require("path");

//Setting node env
function readConfiguration(){
    if(!process.env.NODE_ENV){
        process.env.NODE_ENV = "dev";
    }
    return require(path.join(__dirname, process.env.NODE_ENV));
}

module.exports = readConfiguration();
