const main = require('./main');

module.exports = class Codec {

    constructor(argmap) {
        if ('json' in argmap)
            this.codecJs = main.CodecJsObj.applyJson(
                argmap.json
            );
        else
            this.codecJs = main.CodecJsObj.apply(
                argmap.attributes,
                argmap.data
            );
    }

    encode(datapoint) {
        return this.codecJs.encode(datapoint);
    }

    decode(encodedValues) {
        return this.codecJs.decode(encodedValues);
    }

    json() {
        return this.codecJs.json();
    }

}
