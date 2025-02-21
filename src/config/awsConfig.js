import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

const S3_BUCKET = import.meta.env.VITE_AWS_BUCKET_NAME;
const REGION = import.meta.env.VITE_AWS_REGION;
const ACCESS_KEY = import.meta.env.VITE_AWS_ACCESS_KEY;
const SECRET_KEY = import.meta.env.VITE_AWS_SECRET_KEY;

const s3 = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY,
  },
});

export const uploadFile = async (file) => {
  if (!file) return alert("Please select a file.");
  const arrayBuffer = await file.arrayBuffer();
  const fileName = `${Date.now()}-${file.name}`;

  const params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Body: new Uint8Array(arrayBuffer),
    ContentType: file.type,
  };

  try {
    const upload = await s3.send(new PutObjectCommand(params));
    const fileUrl = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${fileName}`;
    return fileUrl;
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

  const params = {
    Bucket: S3_BUCKET,
    Key: fileKey,
  };

  try {
    await s3.send(new DeleteObjectCommand(params));
    console.log(`File deleted successfully: ${fileKey}`);
    return { success: true, message: "File deleted successfully." };
  } catch (error) {
    console.error("Error deleting file:", error);
    return { success: false, message: "File deletion failed.", error };
  }
};
