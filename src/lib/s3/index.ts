import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import envConf from "../env.conf";

const s3Client = new S3Client({
    credentials: {
        accessKeyId: envConf.aws.accessKeyId,
        secretAccessKey: envConf.aws.secretAccessKey,
    },
    region: envConf.aws.s3Region,
});

export async function uploadFileToS3(file: Buffer<ArrayBufferLike>, filePath: string, filtType: string) {
    const command = new PutObjectCommand({
        Bucket: envConf.aws.s3BucketName,
        Key: filePath,
        Body: file,
        ContentType: filtType,
        ContentDisposition: 'inline',
    });
    await s3Client.send(command);
    return filePath;
}

export async function deleteFileFromS3(filePath: string) {
    const command = new DeleteObjectCommand({
        Bucket: envConf.aws.s3BucketName,
        Key: filePath,
    });
    await s3Client.send(command);

    return true;
}

export async function getFileFromS3(filePath: string) {
    const command = new GetObjectCommand({
        Bucket: envConf.aws.s3BucketName,
        Key: filePath,
    });
    const response = await s3Client.send(command);
    return response;
}