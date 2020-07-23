import * as posenet_types from '@tensorflow-models/posenet/dist/types';
import * as posenet from '@tensorflow-models/posenet';
import { isMobile } from './demo_util';

export class PredictionGuiState {
    input: InputConfig;
    singlePoseDetection: SinglePoseDetectionConfig;
    output: OutputConfig;
    net: posenet.PoseNet;
    camera: string;

    public static get Default(): PredictionGuiState {
        let ret = new PredictionGuiState();
        ret.input = InputConfig.Default;
        ret.output = OutputConfig.Default;
        ret.singlePoseDetection = SinglePoseDetectionConfig.Default;
        return ret;
    }
}

// NN type to use for prediction
// const defaultArchitecture: posenet_types.PoseNetArchitecture = "MobileNetV1";
const defaultArchitecture: posenet_types.PoseNetArchitecture = 'ResNet50';

///////////// MobileNet Configs //////////////////////
// Select from 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800
const defaultMobileNetInputResolution = 500;
const defaultMobileNetMultiplier = isMobile() ? 0.50 : 0.75; // 0.5, 0.75 or 1.0
const defaultMobileNetStride = 16; // 8 or 16

///////////// ResNet Configs //////////////////////
// Select from 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800
const defaultResNetInputResolution = 250;
const defaultResNetMultiplier = 1.0; // Always 1.0
const defaultResNetStride = 32; // 32 or 16

const defaultQuantBytes = 2; // 1, 2 or 4
const minPoseConfidence = 0.1;
const minPartConfidence = 0.5;

class InputConfig {
    architecture: posenet_types.PoseNetArchitecture;
    outputStride: posenet.PoseNetOutputStride;
    inputResolution: posenet.InputResolution;
    multiplier: posenet.MobileNetMultiplier;
    quantBytes: posenet_types.PoseNetQuantBytes;

    public static get Default(): InputConfig {
        let ret = new InputConfig();
        ret.architecture = defaultArchitecture;
        if (ret.architecture == 'MobileNetV1') {
            ret.outputStride = defaultMobileNetStride;
            ret.inputResolution = defaultMobileNetInputResolution;
            ret.multiplier = defaultMobileNetMultiplier;
        } else {
            ret.outputStride = defaultResNetStride;
            ret.inputResolution = defaultResNetInputResolution;
            ret.multiplier = defaultResNetMultiplier;
        }
        ret.quantBytes = defaultQuantBytes;
        return ret;
    }
}

class OutputConfig {
    showSkeleton: boolean;
    showPoints: boolean;
    public static get Default(): OutputConfig {
        let ret = new OutputConfig();
        ret.showSkeleton = false;
        ret.showPoints = false;

        return ret;
    }
}

class SinglePoseDetectionConfig {
    minPoseConfidence: number;
    minPartConfidence: number;
    public static get Default(): SinglePoseDetectionConfig {
        let ret = new SinglePoseDetectionConfig();
        ret.minPoseConfidence = minPoseConfidence;
        ret.minPartConfidence = minPartConfidence;
        return ret;
    }
}
