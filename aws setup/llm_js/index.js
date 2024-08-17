const AWS = require('aws-sdk');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');

// Initialize AWS S3 and Secrets Manager clients
const s3 = new AWS.S3();
const region = "us-east-1";
const secretsManagerClient = new SecretsManagerClient({ region });

exports.handler = async (event) => {
    const s3Bucket = 'resume-puru';
    const resumeFileKey = 'Purushotham_Parthy_Resume.txt';

    try {
        // Fetch the API key from AWS Secrets Manager
        const secretName = "GoogleAPIKey";
        const secretValue = await secretsManagerClient.send(
          new GetSecretValueCommand({
            SecretId: secretName
          })
        );
        const apiKey = JSON.parse(secretValue.SecretString).API_KEY;

        // Fetch the resume from S3
        const resumeData = await s3.getObject({
            Bucket: s3Bucket,
            Key: resumeFileKey
        }).promise();
        const resumeContent = resumeData.Body.toString('utf-8');

        // Extract job description from the event
        const body = JSON.parse(event.body);
        const jobDescription = body.jobDescription || "Your job description here.";

        // Setup the Gemini API
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Prepare the prompt for the API
        const prompt = `Using only the resume data provided, convince the reader that I am fit for the role. Here are the details from the resume:\n${resumeContent}\n\nNote: Use only the information from the resume. Do not infer or add any additional information not explicitly mentioned in the resume. \nJob Description: ${jobDescription}`;

        // Generate content using the Gemini API
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();

        // Log and return the API response along with the input data
        console.log('API Response:', text);
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            body: JSON.stringify({
                response: text,
                inputData: {
                    jobDescription: jobDescription
                }
            })
        };

    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            body: JSON.stringify({ error: error.toString() })
        };
    }
};
