// Import necessary AWS SDK v3 modules using ESM syntax
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import fs from 'fs';
import path from 'path';

// Initialize the S3 client
const s3Client = new S3Client({ region: "<your region as a string>" }); // Replace with your bucket's region
// EXAMPLE: const s3Client = new S3Client({ region: "us-east-1" }); 

// Function to upload a file to S3
async function uploadFileToS3(bucketName, filePath) {
    const fileStream = fs.createReadStream(filePath);
    const fileName = path.basename(filePath); // keep the same file name when stored in S3
    const params = {
        Bucket: bucketName, // The name of your S3 bucket
        Key: fileName, // The key/name of the file under which to store it in the bucket
        Body: fileStream,
        ContentType: 'image/webp' // Set the MIME type, .webp extension in my case
    };

    try {
        const upload = new Upload({
            client: s3Client,
            params: params,
        });

        upload.on("httpUploadProgress", (progress) => {
            console.log(progress); // logs progress
        });

        await upload.done();
        console.log(`File uploaded successfully to ${bucketName}/${fileName}`);
    } catch (error) {
        console.error("Error uploading file:", error);
    }
}

// Example usage
const bucketName = "your-bucket-name"; // Replace with your actual bucket name
const filePath = "/path/to/your/image.webp"; // Replace with the path to your file, this can be a relative or full path
uploadFileToS3(bucketName, filePath);
