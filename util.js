// circle{
//     x: ,
//     y: ,
//     r: ,
// }
// point{
//     x: ,
//     y: ,
// }
export function isInCircle(circle, point) {
    // 中心位置の距離
    // eslint-disable-next-line max-len
    let distance = Math.sqrt(Math.pow(circle.x-point.x, 2) + Math.pow(circle.y-point.y, 2));
    return distance <= circle.r;
}
