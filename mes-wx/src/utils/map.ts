import type { MapPoint } from "@yxgr/uni-app-types";

/** 网格内随机分布点(marker) */
function generateRandomPointsInPolygon(polygonVertices: number[][], numPoints: number): number[][] {
  // 首先获取多边形的最小边界框，即最小x、y值和最大x、y值
  let minX = Infinity,
    maxX = -Infinity,
    minY = Infinity,
    maxY = -Infinity;
  for (let i = 0; i < polygonVertices.length; i++) {
    if (polygonVertices[i][0] < minX) {
      minX = polygonVertices[i][0];
    }
    if (polygonVertices[i][0] > maxX) {
      maxX = polygonVertices[i][0];
    }
    if (polygonVertices[i][1] < minY) {
      minY = polygonVertices[i][1];
    }
    if (polygonVertices[i][1] > maxY) {
      maxY = polygonVertices[i][1];
    }
  }

  // 在最小边界框内随机生成点位，直到有numPoints个点位在多边形内部
  const points: number[][] = [];
  while (points.length < numPoints) {
    const x = Math.random() * (maxX - minX) + minX;
    const y = Math.random() * (maxY - minY) + minY;
    const point: number[] = [x, y];

    if (isPointInPolygon(point, polygonVertices)) {
      points.push(point);
    }
  }

  return points;
}

/** 判断点(marker)是否在多边形内部 */
function isPointInPolygon(point: number[], polygonVertices: number[][]): boolean {
  let inside = false;

  // 射线法判断点是否在多边形内部
  for (let i = 0, j = polygonVertices.length - 1; i < polygonVertices.length; j = i++) {
    const xi = polygonVertices[i][0], yi = polygonVertices[i][1];
    const xj = polygonVertices[j][0], yj = polygonVertices[j][1];
    const intersect = ((yi > point[1]) !== (yj > point[1])) && (point[0] < (xj - xi) * (point[1] - yi) / (yj - yi) + xi);
    if (intersect) {
      inside = !inside;
    }
  }

  return inside;
}

/** 
 * 数组中转换为坐标 [[110.1123,20.1122]] => [{longitude: 110.1123,latitude: 20.1122,}] 
 * @param arr 经纬度坐标 例:[[110.1123,20.1122]]
 */
const convertPointList = (arr: number[][]): MapPoint[] => {
  return arr.map((item) => ({
    latitude: item[1],
    longitude: item[0],
  }))
};

/**
 * 判断给定的点坐标 point 是否在线段 pStart-pEnd 上
 * @param point 待判断点坐标
 * @param pStart 线段起点
 * @param pEnd 线段终点
 * @param precision 容差（该值应包括线的宽度，0则表示精确匹配）
 * @returns {boolean} true-在线段上，false-不在线段上
 */
const PointOnPolyline = (point: { latitude: number, longitude: number }, pStart: { latitude: number, longitude: number }, pEnd: { latitude: number, longitude: number }, precision: number): boolean => {

  // 如果选择的点与当前点重合
  if (Math.abs(pEnd.latitude - point.latitude) <= precision && Math.abs(pEnd.longitude - point.longitude) <= precision) {
    return true;
  }
  if (Math.abs(point.latitude - pStart.latitude) <= precision && Math.abs(point.longitude - pStart.longitude) <= precision) {
    return true;
  }
  if (Math.min(pStart.latitude, pEnd.latitude) <= point.latitude && Math.min(pStart.longitude, pEnd.longitude) <= point.longitude && Math.max(pStart.latitude, pEnd.latitude) >= point.latitude && Math.max(pStart.longitude, pEnd.longitude) >= point.longitude) {
    // 精确匹配判断的话
    if (Math.abs(precision - 0.0) <= 0.0001) {
      const tp1 = [pEnd.latitude - point.latitude, pEnd.longitude - point.longitude];
      const tp2 = [pStart.latitude - point.latitude, pStart.longitude - point.longitude];
      if (Math.abs(Math.abs(tp1[0] * tp2[1] - tp1[1] * tp2[0]) - 0.0) <= 0.00000001) { // 矢量叉乘，平行四边形的面积
        return true;
      }
    } else {
      if (Math.abs(pEnd.latitude - pStart.latitude) <= precision && Math.abs(pEnd.longitude - pStart.longitude) <= precision) {
        return true;
      }
      // 如果点到线短的距离小于容差，则认为点在线段上
      if (DistancePointToSegment(point, pStart, pEnd) <= precision) {
        return true;
      }
    }
  }
  return false;
}
/** 点到线段的距离 */
const DistancePointToSegment = (point: { latitude: number, longitude: number }, pStart: { latitude: number, longitude: number }, pEnd: { latitude: number, longitude: number }) => {
  const l = DistancePointToPoint(pStart, pEnd);
  const s = ((pStart.longitude - point.longitude) * (pEnd.latitude - pStart.latitude) - (pStart.latitude - point.latitude) * (pEnd.longitude - pStart.longitude)) / (l * l);
  return Math.abs(s * l);
}
/** 点与点的距离 */
const DistancePointToPoint = (pStart: { latitude: number, longitude: number }, pEnd: { latitude: number, longitude: number }) => {
  return Math.sqrt(Math.pow(pStart.latitude - pEnd.latitude, 2) + Math.pow(pStart.longitude - pEnd.longitude, 2))
}

/** 
 * @desc 判断点位是否在折线上
 * @param point 折线坐标数组
 * @param pts 给定的坐标
 */
const isPointOnPolyline = (point: { latitude: number, longitude: number }, pts: { latitude: number, longitude: number }[]) => {
  const arrLength = pts.length;
  /** 精度(该值应包括线的宽度，0则表示精确匹配) */
  const precision = 0.00015;
  let isOnPolyline = false;
  for (let i = 0; i < arrLength - 1; i++) {
    const pStart = pts[i];
    const pEnd = pts[i + 1];
    // 判断给定点的坐标是否在线段上
    if (PointOnPolyline(point, pStart, pEnd, precision)) {
      isOnPolyline = true;
      break;
    }
  }
  return isOnPolyline;
};

export { generateRandomPointsInPolygon, isPointInPolygon, convertPointList, isPointOnPolyline };
