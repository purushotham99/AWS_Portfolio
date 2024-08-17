import sys
import os

# Add the 'python' directory to the PYTHONPATH
sys.path.append(os.path.join(os.path.dirname(os.path.realpath(__file__)), "python"))

import boto3
import json
import google.generativeai as genai

# Configure the Gemini API
genai.configure(api_key="AIzaSyDq-U4nDZ6oUaWSPERnMrHSycSGWNaQklA")
model = genai.GenerativeModel('gemini-1.5-flash')

def lambda_handler(event, context):
    # Define the S3 bucket and resume file
    s3_bucket = 'resume-puru'
    resume_file_key = 'Purushotham_Parthy_Resume.txt'
    
    # Initialize S3 client
    s3_client = boto3.client('s3')
    
    # Get the resume file from S3
    resume_object = s3_client.get_object(Bucket=s3_bucket, Key=resume_file_key)
    resume_content = resume_object['Body'].read().decode('utf-8')

    # Extract job description from the API Gateway event
    job_description = "Job Description The role combines leadership, technical expertise, and project management skills to ensure the successful delivery of data analysis projects and the development of a high-performing data analyst team. They play a critical role in leveraging data to drive business growth, optimize processes, and enable informed decision-making across the organization. Have extensively worked on databases (SQL PostGre NoSQL Teradata etc.) Python (NumPy Pandas etc.) Proficiency in Data Science statistical analysis and data manipulation. Strong knowledge of data analysis tools such as Excel SQL Python R or similar .Experience with traditional and advanced machine learning techniques algorithms and analytics-predictive and statistical. Giving attention to detail for data accuracy Problem-solving and critical-thinking abilities .High-level written and verbal communication skills Skills (competencies) Inclusive Communication Verbal Communication Written Communication"

    # Define the prompt
    prompt = (
        "Based on the job description and resume, you must convince me that I fit into the role. "
        "You must not hallucinate and add your own contents. Use only the contents given in the resume."
    )

    # Generate content using the Gemini API
    llm_payload = f"Prompt: {prompt}\nJob Description: {job_description}\nResume: {resume_content}"
    response = model.generate_content(llm_payload)
    
    # Log the response
    print('LLM Response:', response.text)

    # Return the LLM response
    return {
        'statusCode': 200,
        'body': json.dumps({'response': response.text})
    }
