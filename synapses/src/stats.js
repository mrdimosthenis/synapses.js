const main = require('./main');

/**
 * Measure the difference between the values predicted by a neural network and the
 * observed values.
 *
 * ```
 * let expAndPredVals = [
 *   [[0.0, 0.0, 1.0], [0.0, 0.1, 0.9]],
 *   [[0.0, 1.0, 0.0], [0.8, 0.2, 0.0]],
 *   [[1.0, 0.0, 0.0], [0.7, 0.1, 0.2]],
 *   [[1.0, 0.0, 0.0], [0.3, 0.3, 0.4]],
 *   [[0.0, 0.0, 1.0], [0.2, 0.2, 0.6]]
 * ];
 * ```
 *
 * Calculate the root mean square error:
 * ```
 * rmse(expAndPredVals);
 * ```
 *
 * Calculate the score of the classification accuracy:
 * ```
 * score(expAndPredVals);
 * ```
 * @hideconstructor
 */
class stats {

    /**
     * Root Mean Square Error.
     *
     * RMSE is the standard deviation of the prediction errors.
     *
     * @param outputPairs An iterable of array-pairs that contain the expected and predicted values.
     * @return The value of the RMSE metric.
     */
    static rmse(outputPairs){
        return main.StatsJs.rmse(outputPairs);
    }

    /**
     * Classification Accuracy.
     *
     * The ratio of number of correct predictions to the total number of provided pairs.
     * For a prediction to be considered as correct, the index of its maximum expected value
     * needs to be the same with the index of its maximum predicted value.
     *
     * @param outputPairs An iterable of array-pairs that contain the expected and predicted values.
     * @return The score of the classification accuracy.
     */
    static score(outputPairs){
        return main.StatsJs.score(outputPairs);
    }

}

module.exports = stats;
