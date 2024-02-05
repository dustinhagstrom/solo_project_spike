// Import necessary AWS SDK v3 modules
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Initialize the S3 client
const s3Client = new S3Client({ region: "<your region as a string>" }); // Replace with your bucket's region
// EXAMPLE: const s3Client = new S3Client({ region: "us-east-1" }); 

// Function to generate a pre-signed URL for an S3 object
async function generatePresignedUrl(bucketName, objectKey) {
    const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: objectKey,
    });

    try {
        const signedUrl = await getSignedUrl(s3Client, command, {
            expiresIn: 3600, // URL expires in 1 hour
        });
        console.log("Pre-signed URL:", signedUrl);
        return signedUrl;
    } catch (error) {
        console.error("Error generating pre-signed URL:", error);
    }
}

// Example usage
const bucketName = "your-bucket-name"; // Replace with your actual bucket name
const objectKey = "object.webp"; // Replace with the key of the object; aka the filename if you have been following along
generatePresignedUrl(bucketName, objectKey).then((url) => {
    // Here you can use the URL, for example, assigning it to an image tag in HTML
    console.log(`Use this URL in an <img> tag: ${url}`);
});
