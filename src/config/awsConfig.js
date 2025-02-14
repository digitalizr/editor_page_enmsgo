import AWS from "aws-sdk";
import S3 from "aws-sdk/clients/s3";

export const uploadFile = async (file) => {
  if (!file) return alert("Please select a file.");


  const S3_BUCKET = import.meta.env.VITE_AWS_BUCKET_NAME;
  const REGION = import.meta.env.VITE_AWS_REGION;

  AWS.config.update({
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_KEY,
  });

  const s3 = new S3({
    region: REGION,
  });

  const params = {
    Bucket: S3_BUCKET,
    Key: `${Date.now()}-${file.name}`,
    Body: file,
    // ACL: "public-read",
  };

  try {
    const upload = await s3.upload(params).promise();
    // setFileUrl(upload.Location);
    // console.log(upload);
    return upload;
    alert("Upload successful!");
  } catch (error) {
    console.error("Upload error:", error);
    alert("Upload failed!");
  } finally {
    // setUploading(false);
  }
};
