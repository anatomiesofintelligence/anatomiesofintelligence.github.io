"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var tf = require("@tensorflow/tfjs-core");
var support = require("../core/sketch_support");
var SketchRNN = (function () {
    function SketchRNN(checkpointURL) {
        this.NMIXTURE = 20;
        this.checkpointURL = checkpointURL;
        this.initialized = false;
    }
    SketchRNN.prototype.isInitialized = function () {
        return this.initialized;
    };
    SketchRNN.prototype.instantiateFromJSON = function (info, weightDims, weightStrings) {
        this.forgetBias = tf.scalar(1.0);
        this.info = info;
        this.setPixelFactor(2.0);
        this.weightDims = weightDims;
        this.numUnits = this.weightDims[0][0];
        var rawWeights;
        var maxWeight = 10.0;
        this.weights = [];
        for (var i = 0; i < weightStrings.length; i++) {
            rawWeights = new Float32Array(support.stringToArray(weightStrings[i]));
            var N = rawWeights.length;
            for (var j = 0; j < N; j++) {
                rawWeights[j] = maxWeight * rawWeights[j] / 32767;
            }
            this.weights.push(rawWeights);
        }
        this.outputKernel = tf.tensor2d(this.weights[0], [this.weightDims[0][0], this.weightDims[0][1]]);
        this.outputBias = tf.tensor1d(this.weights[1]);
        var lstmKernelXH = tf.tensor2d(this.weights[2], [this.weightDims[2][0], this.weightDims[2][1]]);
        var lstmKernelHH = tf.tensor2d(this.weights[3], [this.weightDims[3][0], this.weightDims[3][1]]);
        var axis = 0;
        this.lstmKernel = tf.concat2d([lstmKernelXH, lstmKernelHH], axis);
        this.lstmBias = tf.tensor1d(this.weights[4]);
        this.rawVars = [
            this.outputKernel,
            this.outputBias,
            this.lstmKernel,
            this.lstmBias
        ];
    };
    SketchRNN.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var vars;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.dispose();
                        return [4, fetch(this.checkpointURL)
                                .then(function (response) { return response.json(); })];
                    case 1:
                        vars = _a.sent();
                        this.instantiateFromJSON(vars[0], vars[1], vars[2]);
                        this.initialized = true;
                        console.log('Initialized SketchRNN.');
                        return [2];
                }
            });
        });
    };
    SketchRNN.prototype.dispose = function () {
        if (this.rawVars) {
            for (var i = 0; i < this.rawVars.length; i++) {
                this.rawVars[i].dispose();
            }
            this.rawVars = undefined;
        }
        if (this.forgetBias) {
            this.forgetBias.dispose();
            this.forgetBias = undefined;
        }
        this.initialized = false;
    };
    SketchRNN.prototype.setPixelFactor = function (scale) {
        this.pixelFactor = scale;
        this.scaleFactor = this.info.scale_factor / this.pixelFactor;
    };
    SketchRNN.prototype.update = function (stroke, state) {
        var _this = this;
        var out = tf.tidy(function () {
            var numUnits = _this.numUnits;
            var s = _this.scaleFactor;
            var normStroke = [stroke[0] / s, stroke[1] / s, stroke[2], stroke[3], stroke[4]];
            var x = tf.tensor2d(normStroke, [1, 5]);
            var c = tf.tensor2d(state.c, [1, numUnits]);
            var h = tf.tensor2d(state.h, [1, numUnits]);
            var newState = tf.basicLSTMCell(_this.forgetBias, _this.lstmKernel, _this.lstmBias, x, c, h);
            return tf.concat(newState, 1);
        });
        var newCH = out.dataSync();
        out.dispose();
        var newC = newCH.slice(0, this.numUnits);
        var newH = newCH.slice(this.numUnits, this.numUnits * 2);
        var finalState = {
            c: new Float32Array(newC),
            h: new Float32Array(newH)
        };
        return finalState;
    };
    SketchRNN.prototype.updateStrokes = function (strokes, state, steps) {
        var _this = this;
        var out = tf.tidy(function () {
            var numUnits = _this.numUnits;
            var s = _this.scaleFactor;
            var normStroke;
            var x;
            var c;
            var h;
            var newState;
            var numSteps = strokes.length;
            if (steps) {
                numSteps = steps;
            }
            c = tf.tensor2d(state.c, [1, numUnits]);
            h = tf.tensor2d(state.h, [1, numUnits]);
            for (var i = 0; i < numSteps; i++) {
                normStroke = [strokes[i][0] / s,
                    strokes[i][1] / s,
                    strokes[i][2],
                    strokes[i][3],
                    strokes[i][4]];
                x = tf.tensor2d(normStroke, [1, 5]);
                newState = tf.basicLSTMCell(_this.forgetBias, _this.lstmKernel, _this.lstmBias, x, c, h);
                c = newState[0];
                h = newState[1];
            }
            return tf.concat(newState, 1);
        });
        var newCH = out.dataSync();
        out.dispose();
        var newC = newCH.slice(0, this.numUnits);
        var newH = newCH.slice(this.numUnits, this.numUnits * 2);
        var finalState = {
            c: new Float32Array(newC),
            h: new Float32Array(newH)
        };
        return finalState;
    };
    SketchRNN.prototype.getPDF = function (state, temperature, softmaxTemperature) {
        var _this = this;
        if (temperature === void 0) { temperature = 0.65; }
        var temp = temperature;
        var discreteTemp = 0.5 + temp * 0.5;
        if (softmaxTemperature) {
            discreteTemp = softmaxTemperature;
        }
        var NOUT = this.NMIXTURE;
        var out = tf.tidy(function () {
            var numUnits = _this.numUnits;
            var h = tf.tensor2d(state.h, [1, numUnits]);
            var sqrttemp = tf.scalar(Math.sqrt(temp));
            var softtemp = tf.scalar(discreteTemp);
            var z = tf.add(tf.matMul(h, _this.outputKernel), _this.outputBias)
                .squeeze();
            var _a = tf.split(z, [3, NOUT * 6]), rawPen = _a[0], rst = _a[1];
            var _b = tf.split(rst, 6), rawPi = _b[0], mu1 = _b[1], mu2 = _b[2], rawSigma1 = _b[3], rawSigma2 = _b[4], rawCorr = _b[5];
            var pen = tf.softmax(rawPen.div(softtemp));
            var pi = tf.softmax(rawPi.div(softtemp));
            var sigma1 = tf.exp(rawSigma1).mul(sqrttemp);
            var sigma2 = tf.exp(rawSigma2).mul(sqrttemp);
            var corr = tf.tanh(rawCorr);
            var result = [pi, mu1, mu2, sigma1, sigma2, corr, pen];
            return tf.concat(result);
        });
        var result = out.dataSync();
        out.dispose();
        var pdf = {
            pi: new Float32Array(result.slice(0, NOUT)),
            muX: new Float32Array(result.slice(1 * NOUT, 2 * NOUT)),
            muY: new Float32Array(result.slice(2 * NOUT, 3 * NOUT)),
            sigmaX: new Float32Array(result.slice(3 * NOUT, 4 * NOUT)),
            sigmaY: new Float32Array(result.slice(4 * NOUT, 15 * NOUT)),
            corr: new Float32Array(result.slice(5 * NOUT, 6 * NOUT)),
            pen: new Float32Array(result.slice(6 * NOUT, 6 * NOUT + 3))
        };
        return pdf;
    };
    SketchRNN.prototype.zeroState = function () {
        var result = {
            c: new Float32Array(this.numUnits),
            h: new Float32Array(this.numUnits)
        };
        return result;
    };
    SketchRNN.prototype.copyState = function (rnnState) {
        var result = {
            c: new Float32Array(rnnState.c),
            h: new Float32Array(rnnState.h)
        };
        return result;
    };
    SketchRNN.prototype.zeroInput = function () {
        return [0, 0, 1, 0, 0];
    };
    SketchRNN.prototype.sample = function (pdf) {
        var idx = support.sampleSoftmax(pdf.pi);
        var mu1 = pdf.muX[idx];
        var mu2 = pdf.muY[idx];
        var sigma1 = pdf.sigmaX[idx];
        var sigma2 = pdf.sigmaY[idx];
        var corr = pdf.corr[idx];
        var penIdx = support.sampleSoftmax(pdf.pen);
        var penstate = [0, 0, 0];
        penstate[penIdx] = 1;
        var delta = support.birandn(mu1, mu2, sigma1, sigma2, corr);
        var stroke = [
            delta[0] * this.scaleFactor,
            delta[1] * this.scaleFactor,
            penstate[0],
            penstate[1],
            penstate[2]
        ];
        return stroke;
    };
    SketchRNN.prototype.simplifyLine = function (line, tolerance) {
        return support.simplifyLine(line, tolerance);
    };
    SketchRNN.prototype.simplifyLines = function (lines, tolerance) {
        return support.simplifyLines(lines, tolerance);
    };
    SketchRNN.prototype.linesToStroke = function (lines) {
        return support.linesToStrokes(lines);
    };
    SketchRNN.prototype.lineToStroke = function (line, lastPoint) {
        return support.lineToStroke(line, lastPoint);
    };
    return SketchRNN;
}());
exports.SketchRNN = SketchRNN;
//# sourceMappingURL=model.js.map