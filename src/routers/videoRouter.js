import express from "express";
import routes from "../routes";
import {
  videos,
  getUpload,
  postUpload,
  videoDetail,
  deleteVideo,
  getEditVideo,
  postEditVideo
} from "../controller/videoController";
import { uploadVideo, onlyPrivate } from "../middlewares";

/*
URL 에 관한 예시  =>
  / is an absolute url, this will be from the root of the website.

  In localhost/one-page/profile:
  img src="hello.png" -> localhost/one-page/profile/hello.png
  img src="/hello.png" -> localhost/hello.png

*/

const videoRouter = express.Router();

videoRouter.get(routes.home, videos);

videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload);

videoRouter.get(routes.videoDetail(), videoDetail);

videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo);

videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);

export default videoRouter;
