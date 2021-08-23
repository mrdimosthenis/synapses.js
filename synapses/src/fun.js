const main = require('./main');

/**
 * The activation functions a neuron can have.
 *
 * They can be used in the arguments of neural network's constructor.
 *
 * @hideconstructor
 */
class fun {

    /**
     * Sigmoid takes any value as input and outputs values in the range of 0.0 to 1.0.
     *
     * ```
     * x => 1.0 / (1.0 + Math.exp(-x))
     * ```
     */
    static SIGMOID = main.FunJs.sigmoid;

    /**
     * Identity is a linear function where the output is equal to the input.
     *
     * ```
     * x => x
     * ```
     */
    static IDENTITY = main.FunJs.identity;

    /**
     * Tanh is similar to sigmoid, but outputs values in the range of -1.0 and 1.0.
     *
     * ```
     * x => Math.tanh(x)
     * ```
     */
    static TANH = main.FunJs.tanh;

    /**
     * LeakyReLU gives a small proportion of x if x is negative and x otherwise.
     *
     * ```
     * x => (x < 0.0) ? 0.01 * x : x
     * ```
     */
    static LEAKY_RE_LU = main.FunJs.leakyReLU;

}

module.exports = fun;
