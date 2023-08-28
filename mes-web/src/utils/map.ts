import "@amap/amap-jsapi-types";

// 生成随机点
const randomPointOnPolyline = (polyline: AMap.LngLatLike[]) => {
  const distance = AMap.GeometryUtil.distanceOfLine(polyline as AMap.LngLatLike[])
  const randomDistance = Math.floor(Math.random() * distance)
  return polylineInterpolate(polyline as any, randomDistance / distance)
}

const polylineInterpolate = (polyline: any, t: number) => {
  const points = polyline;
  const len = points.length;
  const index = Math.floor((len - 1) * t);
  const point = points[index];
  const nextPoint = points[index + 1];
  const ratio = (t * (len - 1)) % 1;
  return [point[0] + (nextPoint[0] - point[0]) * ratio, point[1] + (nextPoint[1] - point[1]) * ratio];
}

// 是否在可视区域
const isInview = (lonLat: any, map:AMap.Map) => {
  const bounds = map.getBounds();
  const NorthEast = bounds.getNorthEast();
  const SouthWest = bounds.getSouthWest();
  const SouthEast = [NorthEast.lng, SouthWest.lat];
  const NorthWest = [SouthWest.lng, NorthEast.lat];
  const path = [
    [NorthEast.lng, NorthEast.lat],
    SouthEast,
    [SouthWest.lng, SouthWest.lat],
    NorthWest
  ]; // 将地图可视区域四个角位置按照顺序放入path，用于判断point是否在可视区域

  const isInView = AMap.GeometryUtil.isPointInRing(
    lonLat,
    <any>path
  );
  return isInView
}

export { randomPointOnPolyline, isInview };

