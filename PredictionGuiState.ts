import * as posenet_types from '@tensorflow-models/posenet/dist/types';
import * as posenet from '@tensorflow-models/posenet';


export class PredictionGuiState {
    algorithm: string;
    input: {
        architecture: posenet_types.PoseNetArchitecture;
        outputStride: posenet.PoseNetOutputStride;
        inputResolution: posenet.InputResolution;
        multiplier: posenet.MobileNetMultiplier;
        quantBytes: posenet_types.PoseNetQuantBytes;
    };
    singlePoseDetection: {
        minPoseConfidence: number;
        minPartConfidence: number;
    };
    multiPoseDetection: {
        maxPoseDetections: number;
        minPoseConfidence: number;
        minPartConfidence: number;
        nmsRadius: number;
    };
    output: {
        showVideo: boolean;
        showSkeleton: boolean;
        showPoints: boolean;
        showBoundingBox: boolean;
    };
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
}
