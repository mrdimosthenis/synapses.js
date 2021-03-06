const main = require('./main');

/**
 * The constructor and methods of neural networks.
 *
 * Create a neural network:
 * ```
 * let net = new Net({layers: [3, 4, 5});
 * ```
 *
 * Get the prediction for an input:
 * ```
 * net.predict([0.4, 0.05, 0.2]);
 * ```
 *
 * Fit network to a single observation:
 * ```
 * net.fit(0.1, [0.4, 0.05, 0.2], 0.03. 0.8);
 * ```
 *
 * Get the JSON representation of the network:
 * ```
 * net.json();
 * ```
 */
class Net {

    /**
     * Creates a neural network.
     *
     * * The `argmap` can have the single property `layers` (the size of each layer).
     * In this case a random neural network is created.
     *
     * * The `argmap` can have the single property `json`
     * (the JSON representation of a neural network).
     * In this case a specific neural network is created.
     *
     * * The `argmap` can have the properties `layers` and `seed`
     * (the number used to initialize the internal pseudorandom number generator).
     * In this case a non-random neural network is created.
     *
     * * The `argmap` can have the properties `layers`,
     * `activation` (the function that accepts the index of a layer and returns
     * an activation function for its neurons) and `weight` (the function that
     * accepts the index of a layer and returns a weight for the synapses of its neurons).
     * In this case a customized neural network is created.
     *
     * @param argmap An object that hold the parameters for the constructor.
     */
    constructor(argmap) {
        if ('activation' in argmap)
            this.netJs = main.NetJsObj.apply(
                argmap.layers,
                argmap.activation,
                argmap.weight
            );
        else if ('seed' in argmap)
            this.netJs = main.NetJsObj.applySeed(
                argmap.layers,
                argmap.seed
            );
        else if ('json' in argmap)
            this.netJs = main.NetJsObj.applyJson(
                argmap.json
            );
        else
            this.netJs = main.NetJsObj.applyRandom(
                argmap.layers
            );
    }

    /**
     * Makes a prediction for the provided input.
     *
     * @param inputValues The values of the features. Their size should be equal to the size of the input layer.
     * @return The prediction. It's size should be equal to the size of the output layer.
     */
    predict(inputValues) {
        return this.netJs.predict(inputValues);
    }

    errors(inputValues, expectedOutput) {
        return this.netJs.errors(inputValues, expectedOutput, false);
    }

    /**
     * Adjust the weights of the neural network to the provided observation.
     *
     * In order for it to be trained, it should fit with multiple observations.
     *
     * @param learningRate   A number that controls how much the weights are adjusted to the observation.
     * @param inputValues    The feature values of the observation.
     * @param expectedOutput The expected output of the observation.
     * It's size should be equal to the size of the output layer.
     */
    fit(learningRate, inputValues, expectedOutput) {
        this.netJs = this.netJs.fit(learningRate, inputValues, expectedOutput)
    }

    /**
     * The JSON representation of the neural network.
     *
     * @return The JSON representation of the neural network.
     */
    json() {
        return this.netJs.json();
    }

    /**
     * An SVG representation of the neural network.
     *
     * @return The SVG representation of the neural network.
     * The color of each neuron depends on its activation function
     * while the transparency of the synapses depends on their weight.
     */
    svg() {
        return this.netJs.svg();
    }

}

module.exports = Net;
