const assert = require('assert');
const fs = require('fs');
const syn = require('../../synapses/src/index');

let seed = 1;

function random() {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

describe('customized network tests', function () {

    let inputValues = [1.0, 0.5625, 0.511111, 0.47619];

    let expectedOutput = [0.4, 0.05, 0.2];

    let layers = [4, 6, 8, 5, 3];

    function activation(layerIndex) {
        switch (layerIndex) {
            case 0:
                return syn.fun.SIGMOID;
            case 1:
                return syn.fun.IDENTITY;
            case 2:
                return syn.fun.LEAKY_RE_LU;
            case 3:
                return syn.fun.TANH;
        }
    }

    function weight(_layerIndex) {
        return 1.0 - 2.0 * random();
    }

    let justCreatedNet = new syn.Net({
        layers: layers,
        activation: activation,
        weight: weight
    });

    let neuralNetworkJson =
        fs.readFileSync('../scala-synapses/test-resources/network.json');

    let neuralNetworkSvg =
        fs.readFileSync('../scala-synapses/test-resources/drawing.svg', 'utf8');

    let neuralNetwork = new syn.Net({json: neuralNetworkJson});

    let prediction = neuralNetwork.predict(inputValues);

    let learningRate = 0.01;

    it('neural network of/to json', function () {
        assert.equal(
            new syn.Net({json: justCreatedNet.json()}).json(),
            justCreatedNet.json()
        );
    });

    it('neural network prediction', function () {
        assert.deepEqual(
            prediction,
            [-0.013959435951885571, -0.16770539176070537, 0.6127887629040738]
        );
    });

    it('neural network normal errors', function () {
        assert.deepEqual(
            neuralNetwork.errors(inputValues, expectedOutput),
            [
                -0.18229373795952453,
                -0.10254022760223255,
                -0.09317233470223055,
                -0.086806455078946
            ]
        );
    });

    it('neural network zero errors', function () {
        assert.deepEqual(
            neuralNetwork.errors(inputValues, prediction),
            [0.0, 0.0, 0.0, 0.0]
        );
    });

    it('neural network svg', function () {
        assert.equal(
            neuralNetwork.svg(),
            neuralNetworkSvg
        );
    });

    it('fit neural network prediction', function () {
        neuralNetwork.fit(learningRate, inputValues, expectedOutput);

        assert.deepEqual(
            neuralNetwork.predict(inputValues),
            [-0.006109464554743645, -0.1770428172237149, 0.6087944183600162]
        );
    });

});
