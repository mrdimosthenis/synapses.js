const syn = require('./main');

module.exports = class Codec {

    constructor(argmap) {
        if ('json' in argmap)
            this.codecJs = syn.CodecJsObj.applyJson(
                argmap.json
            );
        else
            this.netJs = syn.CodecJsObj.apply(
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
