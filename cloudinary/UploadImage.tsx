import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.Cloud_name,
  api_key: process.env.Cloud_API_KEY,
  api_secret: process.env.CLoud_SECRET,
});
export const UploadImage = async ({ image }: { image: any }) => {
  console.log(image);
  const byteArry = await image.arrayBuffer();
  const mime = await image.type;
  const data = await Buffer.from(byteArry).toString("base64");
  const uploadInfo = `data:${mime};base64,${data}`;

  const result = await cloudinary.uploader.upload(uploadInfo, {
    folder: "testify",
  });
  return result.url;
};
