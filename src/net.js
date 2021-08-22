const syn = require('./main');

module.exports = class Net {

    constructor(argmap) {
        if ('activation' in argmap)
            this.netJs = syn.NetJsObj.apply(
                argmap.layers,
                argmap.activation,
                argmap.weight
            );
        else if ('seed' in argmap)
            this.netJs = syn.NetJsObj.applySeed(
                argmap.layers,
                argmap.seed
            );
        else if ('json' in argmap)
            this.netJs = syn.NetJsObj.applyJson(
                argmap.json
            );
        else
            this.netJs = syn.NetJsObj.applyRandom(
                argmap.layers
            );
    }

    predict(inputValues) {
        return this.netJs.predict(inputValues);
    }

    errors(inputValues, expectedOutput) {
        return this.netJs.errors(inputValues, expectedOutput, false);
    }

    fit(learningRate, inputValues, expectedOutput) {
        this.netJs = this.netJs.fit(learningRate, inputValues, expectedOutput)
    }

    json() {
        return this.netJs.json();
    }

    svg() {
        return this.netJs.svg();
    }

}
