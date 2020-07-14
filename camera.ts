/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
import * as posenet from '@tensorflow-models/posenet';
import * as posenet_types from '@tensorflow-models/posenet/dist/types';
import * as utils from "./util"
import { PredictionGuiState } from './PredictionGuiState'
import Stats = require('stats.js')

import { drawKeypoints, drawSkeleton, isMobile, toggleLoadingUI } from './demo_util';
import { GameState } from './GameState'
import { Score } from './Score'
import { ScorePanel } from './ScorePanel'

const videoWidth = 900;
const videoHeight = 750;
const stats = new Stats();

/**
 * Loads a the camera to be used in the demo
 *
 */
async function setupCamera(): Promise<HTMLVideoElement> {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    throw new Error(
      'Browser API navigator.mediaDevices.getUserMedia not available');
  }

  const video = <HTMLVideoElement>document.getElementById('video');
  video.width = videoWidth;
  video.height = videoHeight;

  const mobile = isMobile();
  const stream = await navigator.mediaDevices.getUserMedia({
    'audio': false,
    'video': {
      facingMode: 'user',
      width: mobile ? undefined : videoWidth,
      height: mobile ? undefined : videoHeight,
    },
  });
  video.srcObject = stream;

  return new Promise((resolve) => {
    video.onloadedmetadata = () => {
      resolve(video);
    };
  });
}

async function loadVideo(): Promise<HTMLVideoElement> {
  const video = await setupCamera();
  video.play();

  return video;
}

const guiState = PredictionGuiState.Default;

/**
 * Sets up dat.gui controller on the top-right of the window
 */
function setupGui(cameras: any[], net: posenet.PoseNet) {
  guiState.net = net;

  if (cameras.length > 0) {
    guiState.camera = cameras[0].deviceId;
  }
}

/**
 * Sets up a frames per second panel on the top-left of the window
 */
function setupFPS() {
  stats.showPanel(0);  // 0: fps, 1: ms, 2: mb, 3+: custom
  document.getElementById('main').appendChild(stats.dom);
}

/**
 * Feeds an image to posenet to estimate poses - this is where the magic
 * happens. This function loops with a requestAnimationFrame method.
 */
function detectPoseInRealTime(video: HTMLVideoElement, net: posenet.PoseNet, gameState: GameState) {
  const canvas = <HTMLCanvasElement>document.getElementById('output');
  const ctx = canvas.getContext('2d');

  // since images are being fed from a webcam, we want to feed in the
  // original image and then just flip the keypoints' x coordinates. If instead
  // we flip the image, then correcting left-right keypoint pairs requires a
  // permutation on all the keypoints.
  const flipPoseHorizontal = true;

  canvas.width = videoWidth;
  canvas.height = videoHeight;

  async function poseDetectionFrame() {
    // Begin monitoring code for frames per second
    stats.begin();
  
    let poses: posenet.Pose[] = [];
    const pose = await guiState.net.estimatePoses(video, {
      flipHorizontal: flipPoseHorizontal,
      decodingMethod: 'single-person'
    });
    poses = poses.concat(pose);
    let minPoseConfidence: number = guiState.singlePoseDetection.minPoseConfidence;
    let minPartConfidence: number = guiState.singlePoseDetection.minPartConfidence;

    ctx.clearRect(0, 0, videoWidth, videoHeight);

    // Show video
    ctx.save();
    ctx.scale(-1, 1);
    ctx.translate(-videoWidth, 0);
    ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
    ctx.restore();

    // For each pose (i.e. person) detected in an image, loop through the poses
    // and draw the resulting skeleton and keypoints if over certain confidence
    // scores
    let points: Array<posenet_types.Vector2D>;
    poses.forEach(({ score, keypoints }) => {
      if (score >= minPoseConfidence) {
        if (guiState.output.showPoints) {
          drawKeypoints(keypoints, minPartConfidence, ctx);
        }
        if (guiState.output.showSkeleton) {
          drawSkeleton(keypoints, minPartConfidence, ctx);
        }
        points = keypoints.map(function (kp) { return kp.position });
      }
    });
    if (points) {
      gameState.update(points, ctx);
    }

    const remainingTime = gameState.getRemainingTime()
    // ゲーム終了かどうかを判断
    if (remainingTime <= 0){
      const params = new URLSearchParams(window.location.search);
      const level = params.get('level').toLowerCase()
      utils.jumpToResultPage(gameState.score, level)
    }

    // End monitoring code for frames per second
    stats.end();
    requestAnimationFrame(poseDetectionFrame);
  }

  poseDetectionFrame();
}

/**
 * Kicks off the demo by loading the posenet model, finding and loading
 * available camera devices, and setting off the detectPoseInRealTime function.
 */
export async function bindPage() {
  toggleLoadingUI(true);
  const net = await posenet.load(guiState.input);
  let video;

  try {
    video = await loadVideo();
  } catch (e) {
    let info = document.getElementById('info');
    info.textContent = 'this browser does not support video capture,' +
      'or this device does not have a camera';
    info.style.display = 'block';
    throw e;
  }
  setupGui([], net);
  setupFPS();
  toggleLoadingUI(false);

  const params = new URLSearchParams(window.location.search);
  const level = params.get('level').toLowerCase();
  const events = new Score(level).events;
  const gameTime = Math.max(...events.map(ev => ev.end)) + 1000;
  const scorePanel = new ScorePanel(level);
  let gameState = new GameState(scorePanel, gameTime);

  for (let i = 1; i < 10; i++) {
    const centerX = 450;
    const centerY = 405;
    const alignR = 350;
    const filtered = events.filter(ev => ev.circleNumber == i);
    gameState.addTarget(new utils.Circle(centerX - alignR * Math.sin(Math.PI / 5 * i),
      centerY + alignR * Math.cos(Math.PI / 5 * i), 50), filtered);
  }
  gameState.start();
  detectPoseInRealTime(video, net, gameState);
}

navigator.getUserMedia = navigator.getUserMedia;

// kick off the demo
bindPage();
