import type { MapMarker, MapPolygon, MapPolyline } from "@yxgr/uni-app-types";

export declare interface MarkerType extends MapMarker {
	joinCluster?: boolean
	data: any
	type?: "object"|"user"|"car"
}

export declare interface PolygonType extends MapPolygon {
	data?: any
}

export declare interface PolylineType extends MapPolyline {
	data?: any
}

export declare interface MapData {
	polygons: PolygonType[]
	polyline: PolylineType[]
	markers: MarkerType[]
}

export declare type FileType = {
	/** 文件类型 "1":图片；"2":视频 */
	type?: string
	/** 文件路径 */
	url?: string
	/** 经度 */
	longitude?: string
	/** 纬度 */
	latitude?: string
	/** 图片水印的时间 */
	photographTime?: string
	/** 详细地址 */
	fullAddress?: string
	/** 视频缩略图 */
	poster?: string
	/** 人脸图片的相对路径 */
	faceUrl?: string
}

export declare type JobType = "Manual_cleaning"|"Vehicle_operation"
