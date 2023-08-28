import COS from "cos-wx-sdk-v5";
import dayjs from "dayjs";

const ENVURL = import.meta.env.PROD ? "prod/" : "dev/"
const date = dayjs().format("YYYYMMDD/")

const cos = new COS({
  SecretId: "AKIDwqjT7XlprDRdjeP9j9NXaPzUpAU1Slw4",
  SecretKey: "4yeKvOtOrFZjliV9h8QYSLCzmX5Q9j8M",
  SimpleUploadMethod: "putObject",
});
const defaultURL = "mes/wx/" + ENVURL + date
const faceCollectBaseURL = "mes/face-collect/" + ENVURL + date

/** 
 * @desc 图片上传云存储
 * @param {String} filePath 文件相对路径
 * @param {Boolean} isFace 是否人脸采集的图片
 */
const upload = (filePath: string,isFace = false) => {
  return new Promise<{ code: number, data: string }>((resolve, reject) => {
    cos.putObject({
      Bucket: "zcwy-1314423366", /* 填入您自己的存储桶，必须字段 */
      Region: "ap-guangzhou",  /* 存储桶所在地域，例如ap-beijing，必须字段 */
      // Key: "mes/wx/" + filePath.replace(/[http:\/\/tmp\/ | wxfile:\/\/tmp_]/g,""),  /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
      Key: (isFace ? faceCollectBaseURL : defaultURL) + filePath.replace("http://tmp/", "").replace("wxfile://tmp_", ""),  /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
      FilePath: filePath, /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */
    }, (err: any, data: any) => {
      if (err) {
        reject(err)
      } else {
        resolve({
          code: data.statusCode ?? 200,
          data: data.Location.split(".com")[1],
        })
      }
    });
  })
}

export { upload };
