import * as posenet_types from '@tensorflow-models/posenet/dist/types';
import * as posenet from '@tensorflow-models/posenet';
import { isMobile } from './demo_util';

export class PredictionGuiState {
    input: InputConfig;
    singlePoseDetection: SinglePoseDetectionConfig;
    output: OutputConfig;
    net: posenet.PoseNet;
    camera: string;
    multiplier: posenet.MobileNetMultiplier;
    changeToMultiplier: posenet.MobileNetMultiplier;
    inputResolution: posenet.InputResolution;
    changeToInputResolution: posenet.InputResolution;
    outputStride: posenet.PoseNetOutputStride;
    changeToOutputStride: posenet.PoseNetOutputStride;
    architecture: posenet_types.PoseNetArchitecture;
    changeToArchitecture: posenet_types.PoseNetArchitecture;
    quantBytes: posenet_types.PoseNetQuantBytes;
    changeToQuantBytes: posenet_types.PoseNetQuantBytes;
    tryResNetButton: any;

    public static get Default(): PredictionGuiState {
        let ret = new PredictionGuiState();
        ret.input = InputConfig.Default;
        ret.output = OutputConfig.Default;
        ret.singlePoseDetection = SinglePoseDetectionConfig.Default;
        return ret;
    }
}

const defaultMobileNetStride = 16;
const defaultMobileNetInputResolution = 500;
const defaultQuantBytes = 2;
const defaultMobileNetMultiplier = isMobile() ? 0.50 : 0.75;

class InputConfig {
    architecture: posenet_types.PoseNetArchitecture;
    outputStride: posenet.PoseNetOutputStride;
    inputResolution: posenet.InputResolution;
    multiplier: posenet.MobileNetMultiplier;
    quantBytes: posenet_types.PoseNetQuantBytes;

    public static get Default(): InputConfig {
        let ret = new InputConfig();
        ret.architecture = 'MobileNetV1';
        ret.outputStride = defaultMobileNetStride;
        ret.inputResolution = defaultMobileNetInputResolution;
        ret.multiplier = defaultMobileNetMultiplier;
        ret.quantBytes = defaultQuantBytes;
        return ret;
    }
}

class OutputConfig {
    showSkeleton: boolean;
    showPoints: boolean;
    public static get Default(): OutputConfig {
        let ret = new OutputConfig();
        ret.showSkeleton = true;
        ret.showPoints = true;

        return ret;
    }
}

class SinglePoseDetectionConfig {
    minPoseConfidence: number;
    minPartConfidence: number;
    public static get Default(): SinglePoseDetectionConfig {
        let ret = new SinglePoseDetectionConfig();
        ret.minPoseConfidence = 0.1;
        ret.minPartConfidence = 0.5;
        return ret;
    }
}
