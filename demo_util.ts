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
import { Tuple } from '@tensorflow-models/posenet/dist/keypoints';

const color = 'aqua';
const boundingBoxColor = 'red';
const lineWidth = 2;

export const tryResNetButtonName = 'tryResNetButton';
export const tryResNetButtonText = '[New] Try ResNet50';
const tryResNetButtonTextCss = 'width:100%;text-decoration:underline;';
const tryResNetButtonBackgroundCss = 'background:#e61d5f;';

function isAndroid() {
  return /Android/i.test(navigator.userAgent);
}

function isiOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

export function isMobile() {
  return isAndroid() || isiOS();
}

function setDatGuiPropertyCss(propertyText: string, liCssString: string, spanCssString: string = '') {
  var spans = document.getElementsByClassName('property-name');
  for (var i = 0; i < spans.length; i++) {
    var span = <HTMLSpanElement>spans[i]
    var text = spans[i].textContent || span.innerText;
    if (text == propertyText) {
      let grandParent = <HTMLElement>span.parentNode.parentNode;
      grandParent.setAttribute('style', liCssString);
      if (spanCssString !== '') {
        span.setAttribute('style', spanCssString);
      }
    }
  }
}

export function updateTryResNetButtonDatGuiCss() {
  setDatGuiPropertyCss(
    tryResNetButtonText, tryResNetButtonBackgroundCss,
    tryResNetButtonTextCss);
}

/**
 * Toggles between the loading UI and the main canvas UI.
 */
export function toggleLoadingUI(
  showLoadingUI: boolean, loadingDivId = 'loading', mainDivId = 'main') {
  if (showLoadingUI) {
    document.getElementById(loadingDivId).style.display = 'block';
    document.getElementById(mainDivId).style.display = 'none';
  } else {
    document.getElementById(loadingDivId).style.display = 'none';
    document.getElementById(mainDivId).style.display = 'block';
  }
}

function toTuple({ y, x }: any): any {
  return [y, x];
}

export function drawPoint(ctx: CanvasRenderingContext2D, y: number, x: number, r: number, color: string) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

/**
 * Draws a line on a canvas, i.e. a joint
 */
export function drawSegment([ay, ax]: Tuple<number>, [by, bx]: Tuple<number>, color: string, scale: number, ctx: CanvasRenderingContext2D) {
  ctx.beginPath();
  ctx.moveTo(ax * scale, ay * scale);
  ctx.lineTo(bx * scale, by * scale);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  ctx.stroke();
}

/**
 * Draws a pose skeleton by looking up all adjacent keypoints/joints
 */
export function drawSkeleton(keypoints: posenet.Keypoint[], minConfidence: number, ctx: CanvasRenderingContext2D, scale = 1) {
  const adjacentKeyPoints =
    posenet.getAdjacentKeyPoints(keypoints, minConfidence);

  adjacentKeyPoints.forEach((keypoints) => {
    drawSegment(
      toTuple(keypoints[0].position), toTuple(keypoints[1].position), color,
      scale, ctx);
  });
}

/**
 * Draw pose keypoints onto a canvas
 */
export function drawKeypoints(keypoints: posenet.Keypoint[], minConfidence: number, ctx: CanvasRenderingContext2D, scale = 1) {
  // Do not draw keypoints of eyes, ears and nose
  for (let i = 5; i < keypoints.length; i++) {
    const keypoint = keypoints[i];

    if (keypoint.score < minConfidence) {
      continue;
    }

    const { y, x } = keypoint.position;
    drawPoint(ctx, y * scale, x * scale, 3, color);
  }
}

/**
 * Draw the bounding box of a pose. For example, for a whole person standing
 * in an image, the bounding box will begin at the nose and extend to one of
 * ankles
 */
export function drawBoundingBox(keypoints: posenet.Keypoint[], ctx: CanvasRenderingContext2D) {
  const boundingBox = posenet.getBoundingBox(keypoints);

  ctx.rect(
    boundingBox.minX, boundingBox.minY, boundingBox.maxX - boundingBox.minX,
    boundingBox.maxY - boundingBox.minY);

  ctx.strokeStyle = boundingBoxColor;
  ctx.stroke();
}

/**
 * Converts an arary of pixel data into an ImageData object
 */
export async function renderToCanvas(a: any, ctx: CanvasRenderingContext2D) {
  const [height, width] = a.shape;
  const imageData = new ImageData(width, height);

  const data = await a.data();

  for (let i = 0; i < height * width; ++i) {
    const j = i * 4;
    const k = i * 3;

    imageData.data[j + 0] = data[k + 0];
    imageData.data[j + 1] = data[k + 1];
    imageData.data[j + 2] = data[k + 2];
    imageData.data[j + 3] = 255;
  }

  ctx.putImageData(imageData, 0, 0);
}

/**
 * Draw an image on a canvas
 */
export function renderImageToCanvas(image: CanvasImageSource, size: number[], canvas: HTMLCanvasElement) {
  canvas.width = size[0];
  canvas.height = size[1];
  const ctx = canvas.getContext('2d');

  ctx.drawImage(image, 0, 0);
}

// /**
//  * Draw heatmap values, one of the model outputs, on to the canvas
//  * Read our blog post for a description of PoseNet's heatmap outputs
//  * https://medium.com/tensorflow/real-time-human-pose-estimation-in-the-browser-with-tensorflow-js-7dd0bc881cd5
//  */
// export function drawHeatMapValues(heatMapValues, outputStride, canvas:HTMLCanvasElement) {
//   const ctx = canvas.getContext('2d');
//   const radius = 5;
//   const scaledValues = heatMapValues.mul(tf.scalar(outputStride, 'int32'));

//   drawPoints(ctx, scaledValues, radius, color);
// }

// /**
//  * Used by the drawHeatMapValues method to draw heatmap points on to
//  * the canvas
//  */
// function drawPoints(ctx:CanvasRenderingContext2D, points, radius, color) {
//   const data = points.buffer().values;

//   for (let i = 0; i < data.length; i += 2) {
//     const pointY = data[i];
//     const pointX = data[i + 1];

//     if (pointX !== 0 && pointY !== 0) {
//       ctx.beginPath();
//       ctx.arc(pointX, pointY, radius, 0, 2 * Math.PI);
//       ctx.fillStyle = color;
//       ctx.fill();
//     }
//   }
// }

// /**
//  * Draw offset vector values, one of the model outputs, on to the canvas
//  * Read our blog post for a description of PoseNet's offset vector outputs
//  * https://medium.com/tensorflow/real-time-human-pose-estimation-in-the-browser-with-tensorflow-js-7dd0bc881cd5
//  */
// export function drawOffsetVectors(
//   heatMapValues, offsets, outputStride, scale = 1, ctx: CanvasRenderingContext2D) {
//   const offsetPoints =
//     posenet.singlePose.getOffsetPoints(heatMapValues, outputStride, offsets);

//   const heatmapData = heatMapValues.buffer().values;
//   const offsetPointsData = offsetPoints.buffer().values;

//   for (let i = 0; i < heatmapData.length; i += 2) {
//     const heatmapY = heatmapData[i] * outputStride;
//     const heatmapX = heatmapData[i + 1] * outputStride;
//     const offsetPointY = offsetPointsData[i];
//     const offsetPointX = offsetPointsData[i + 1];

//     drawSegment(
//       [heatmapY, heatmapX], [offsetPointY, offsetPointX], color, scale, ctx);
//   }
// }
