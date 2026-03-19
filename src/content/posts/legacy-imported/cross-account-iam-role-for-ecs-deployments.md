---
title: "Cross Account IAM Role for ECS deployments"
description: "In my setup I have 2 accounts: Account A runs CodeCommit + CodePipeline Account B has an ECS cluster Most of the steps I did are described in the Create a Pipeline in CodePipeline "
publishedAt: 2020-05-01
updatedAt: 2020-05-01
tags:
  - aws
  - codepipeline
  - ecs
  - iam
  - roles
  - tech
legacySourceUrl: https://mkreder.com/2020/05/01/cross-account-iam-role-for-ecs-deployments/
---
<p>In my setup I have 2 accounts:</p>

<p>Account A runs CodeCommit + CodePipeline</p>

<p>Account B has an ECS cluster</p>

<p>Most of the steps I did are described in the <a href="https://docs.aws.amazon.com/codepipeline/latest/userguide/pipelines-create-cross-account.html">Create a Pipeline in CodePipeline That Uses Resources guide from AWS.</a></p>

<p>However, my setup is to deploy to ECS using CodePipeline without using CodeDeploy. So I had to create a CrossAccount role with the following policies.</p>

<p>Policy to access KMS key in account A</p>

<pre class="wp-block-code"><code>{
     "Version": "2012-10-17",
     "Statement": [
         {
             "Sid": "Allow access to KMS key on Account A",
             "Action": [
                 "kms:Decrypt",
                 "kms:DescribeKey",
                 "kms:Encrypt",
                 "kms:GenerateDataKey",
                 "kms:ReEncrypt"             
             ],             
           "Effect": "Allow",             
           "Resource": "KEYARN"
         }
     ]
 } </code></pre>

<p>Policy to allow access to S3 bucket in account A:</p>

<pre class="wp-block-code"><code>{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "Allow access to S3 bucket in Account A",
            "Effect": "Allow",
            "Action": "s3:*",
            "Resource": [
                "arn:aws:s3:::your-bucket-name",
                "arn:aws:s3:::your-bucket-name/*"
            ]
        }
    ]
}</code></pre>

<p>Policy to allow access to ECS in account B</p>

<pre class="wp-block-code"><code>{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "Allow access to ECS",
            "Effect": "Allow",
            "Action": "ecs:*",
            "Resource": [
                "*"
            ]
        }
    ]
}</code></pre>

<p>Policy to pass the role to ECS:</p>

<pre class="wp-block-code"><code>{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
                "iam:PassRole"
            ],
            "Resource": "*",
            "Effect": "Allow",
            "Condition": {
                "StringEqualsIfExists": {
                    "iam:PassedToService": [
                        "ecs-tasks.amazonaws.com"
                    ]
                }
            }
        }
    ]
}</code></pre>

<p>Without these policies I was getting a lot of different errors in CodePipeline like "The provided role does not have sufficient permissions to access ECS" or "The provided role does not have sufficient permissions (to access certain bucket)..</p>

<p><br></p>
