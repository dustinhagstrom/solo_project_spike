// Import necessary AWS SDK v3 modules
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

// Initialize the S3 client
const s3Client = new S3Client({ region: "<your region as a string>" }); // Replace with your bucket's region
// EXAMPLE: const s3Client = new S3Client({ region: "us-east-1" }); 

// Function to delete an object from S3
async function deleteObjectFromS3(bucketName, objectKey) {
    const params = {
        Bucket: bucketName, // The name of your S3 bucket
        Key: objectKey, // The key/name of the object to delete
    };

    try {
        const command = new DeleteObjectCommand(params);
        const response = await s3Client.send(command);
        console.log(`Object deleted successfully: ${objectKey}`);
    } catch (error) {
        console.error("Error deleting object:", error);
    }
}

// Example usage
const bucketName = "your-bucket-name"; // Replace with your actual bucket name
const objectKey = "object.webp"; // Replace with the key of the object; aka the filename if you have been following along
deleteObjectFromS3(bucketName, objectKey);
