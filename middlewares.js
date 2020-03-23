import multerS3 from "multer-s3";
import aws from "aws-sdk";
import routes from "./routes";
import multer from "multer";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  region: "ap-northeast-2"
});

const multerVideo = multer({
  storage: multerS3({
    s3,
    //access control list
    acl: "public-read",
    bucket: "youtube-clone-by-nomad2569/video"
  })
});
const multerAvatar = multer({
  storage: multerS3({
    s3,
    //access control list
    acl: "public-read",
    bucket: "youtube-clone-by-nomad2569/avatar"
  })
});

export const localMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

export const uploadVideo = multerVideo.single("file");
export const uploadAvatar = multerAvatar.single("avatar");
