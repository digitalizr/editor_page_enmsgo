import AWS from "aws-sdk";
import S3 from "aws-sdk/clients/s3";

const S3_BUCKET = import.meta.env.VITE_AWS_BUCKET_NAME;
const REGION = import.meta.env.VITE_AWS_REGION;
const ACCESS_KEY = import.meta.env.VITE_AWS_ACCESS_KEY;
const SECRET_KEY = import.meta.env.VITE_AWS_SECRET_KEY;

export const uploadFile = async (file) => {
  if (!file) return alert("Please select a file.");

  // const S3_BUCKET = import.meta.env.VITE_AWS_BUCKET_NAME;
  // const REGION = import.meta.env.VITE_AWS_REGION;

  AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY,
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
  } catch (error) {
    console.error("Upload error:", error);
    alert("Upload failed!");
  }
};

export const deleteFile = async (fileKey) => {
  if (!fileKey) {
    console.error("File key is required.");
    return;
  }

  const s3 = new S3({
    region: REGION,
  });

  const params = {
    Bucket: S3_BUCKET,
    Key: fileKey,
  };

  try {
    await s3.deleteObject(params).promise();
    console.log(`File deleted successfully: ${fileKey}`);
    return { success: true, message: "File deleted successfully." };
  } catch (error) {
    console.error("Error deleting file:", error);
    return { success: false, message: "File deletion failed.", error };
  }
};
