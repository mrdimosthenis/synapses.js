const main = require('./main');

/**
 * The constructors and methods of codecs.
 *
 * Create a codec:
 * ```
 * let setosa = {
 *     petal_length: "1.5",
 *     species: "setosa"
 * };
 *
 * let versicolor = {
 *     petal_length: "3.8",
 *     species: "versicolor"
 * };
 *
 * let dataset = [setosa, versicolor];
 *
 * let attributes = [
 *   ["petal_length", false],
 *   ["species", true],
 * ];
 *
 * let codec = new Codec({attributes: attributes, data: dataset});
 * ```
 *
 * Encode a data point:
 * ```
 * codec.encode(setosa);
 * ```
 *
 * Decode a data point:
 * ```
 * codec.decode([0.0, 1.0, 0.0]);
 * ```
 *
 * Get the JSON representation of the codec:
 * ```
 * codec.json();
 * ```
 */
module.exports = class Codec {

    /**
     * Creates a codec by consuming an iterable of data points.
     *
     * @param argmap An object that contains the properties `attributes`
     * (the array of attributes that defines their names and types: discrete or not)
     * and `data` (the iterable that contains the data points).
     * Alternatively, the `argmap` can be an object with a single parameter
     * `json` (the JSON representation of a codec).
     */
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

    /**
     * Encodes a data point.
     *
     * @param datapoint A data point as an object of string properties.
     * @return The encoded data point as an array of numbers between 0.0 and 1.0.
     */
    encode(datapoint) {
        return this.codecJs.encode(datapoint);
    }


    /**
     * Decodes a data point.
     *
     * @param encodedValues An encoded data point as an array of numbers between 0.0 and 1.0.
     * @return The decoded data point as an object of string properties.
     */
    decode(encodedValues) {
        return this.codecJs.decode(encodedValues);
    }

    /**
     * The JSON representation of the codec.
     *
     * @return The JSON representation of the codec.
     */
    json() {
        return this.codecJs.json();
    }

}
