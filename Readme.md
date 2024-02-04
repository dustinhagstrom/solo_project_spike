# Spike: AWS S3 Exploration
To explore AWS S3 as a viable option for image storage and retrieval to lessen the burden of the same storage and retrieval of images on my simple web app server.

## Requirements to reproduce my process
- You must have an AWS account, visit this link to set that up https://docs.aws.amazon.com/lookout-for-equipment/latest/ug/getting-started-brain.html
- Some familiarity with basic computer networking communications
- Nice to have:
  - AWS EC2 instance, so that S3 doesn't have to be public-facing

## Steps
1. Learn about S3 buckets and what problems they can help solve https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html
2. Learn about how to set up an S3 bucket https://docs.aws.amazon.com/AmazonS3/latest/userguide/setting-up-s3.html
   - Go to S3 dashboard
   - Click on ***Create bucket***
   - Fill out the S3 form
      - If you need S3 to be publicly accessible then uncheck ***Block all public access*** and uncheck all or some of the sub-boxes. **I kept my S3 bucket private** 
      - Note - Keep the default encryption scheme, which saves money and reduces complexity.
      - Click ***Create bucket***
3. Learn about giving a role to your AWS EC2 instance https://repost.aws/knowledge-center/ec2-instance-access-s3-bucket
      - Optional - only necessary if you want EC2 to access private S3 bucket
      - Note - There are other permission strategies that grant access to S3 bucket for EC2 instance
   1. Choose the pre-built ***AmazonS3FullAccess*** policy from the list of options, but ye be warned that this policy will allow the service that has this role to access all of the S3 buckets within your AWS account, which is a poor security practice contrary to the principle of least privilege. I created my own policy and role in IAM using the steps that follow:
   2. To write your own access policy for your EC2 instance 
      - Go to IAM dashboard 
      - Click on ***Policies*** in side menu
      - Click on ***Create Policy*** button
      - Select ***S3*** as desired service
      - Click on the available drop-downs to see all of the permissions that can be included in this policy.
      - To grant Read permissions, Click on ***Read*** dropdown and select checkbox for ***GetObject***
      - To grant Create and Delete permissions, Click on ***DeleteObject*** dropdown and ***PutObject*** dropdown
      - Update permissions are N/A for this object storage system, think about what an update would look like for an Image 🤠
      - Click on ***Add ARNs*** within the ***Resources*** section to target a specific S3 bucket
        - write the bucket name for the bucket that was created in step 2.
        - put a * (or click the 'Any object name' checkbox to the right) for the ***resource object name*** which allows access to all objects within the S3 bucket
        - The bottom text field is automatically generated from the previous two steps.
        - Click on ***Add ARNs***
      - Click ***Next***
      - Name this policy and write a short description then click ***Create policy***
   3. If you created a policy, then attach that policy that was created to an IAM Role, so that we can assign our EC2 instance this role.
      - Click on ***Roles*** is side menu of IAM dashboard
      - Click on ***Create role***
      - Keep the default radio button selected for ***AWS service***
      - Select EC2 for ***Service or use case***
      - Click ***Next***
      - For the ***Permissions policies*** section we can ***Filter by Type*** to ***Customer Managed*** to narrow down to policies that include the one we just made in the previous step. Select the checkbox next to this policy
      - Click ***Next***
      - Name the role
      - Click ***Create role***
    4. To assign our EC2 our new role
       - Go to EC2 dashboard
       - Select desired EC2
       - Click on ***Actions***
       - Select ***Security***
       - Click ***Modify IAM role***
       - Choose your newly created role from the dropdown menu
       - Click on ***Update IAM role***
4. Now, we can focus on using an SDK so that our application can programmatically interact with the bucket. Since our application will be hosted on the EC2 instance, it will have the same access privileges to our S3 bucket as the EC2 instance. https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/welcome.html
   - There is a version 2 and and version 3 of the Javascript SDK library, we can use version 3 and only download the portions of the SDK that we need. Version 2 requires a full download and import of the sdk.
5. SSH into your AWS EC2 instance
6. Download and install the latest version of Node.JS https://nodejs.org/en/learn/getting-started/how-to-install-nodejs
   - I downloaded NVM to manage my Node.js 
7. I am using the latest version of Node.js at the time of this writing, v20.10.0
8. Create a new directory for your sample project
9. Install the necessary code to interact with S3 only https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/
   - I used: *>npm i @aws-sdk/client-s3*
10. Let's put a sample image onto our AWS EC2 instance using the secure copy protocol (for Linux based EC2 instances). From the host computer where the file is located:
    - **scp -r -i \<EC2 access key> \<image file name> ec2-user@ec2-###-###-###-###.compute-1.amazonaws.com:~/**
    - This will copy the file from the local computer to the home directory of the Linux EC2 instance
11. 
