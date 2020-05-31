# Webpage status check AWS lambda

Nodejs lambda webpage status checker

## Usage

Change The following things to make it work. (index.js)

```javascript
AWS.config.update({ region: "us-east-1" }); // <-- Cloud Watch region name

const CLOUD_WATCH = new AWS.CloudWatch({
  apiVersion: "2010-08-01",
  accessKeyId: "xxxxxxxxxxxxxxxxx", // <-- access key
  secretAccessKey: "xxxxxxxxxxxxxxxxxx" // <-- secret access key
});
const URL = "https://example.com"; // <-- Add page URL here for status
const SEARCH_STRING = "Your string for check in body part";
const VERSION = `1.0.0`;
const MetricName = "example_status"; // <-- Metric name
const PageName = "example"; // <-- Page name "not relevant to HTML title"
```

## AWS

Log in with your AWS account and follow the steps.

- Go to the IAM page of AWS.
- Select Users from the sidebar.
- Click on create a user.
- Add username with programmatic access to that user click on next.
- Now attach policy `CloudWatchFullAccess` and click next.
- Add `accessKeyId`, `secretAccessKey`, into a `index.js` file.

Or you can use roles instead of creating the user then you can comment `accessKeyId` and `secretAccessKey`.

## Installation

`npm i` install packages.

`npm run build` this will create a zip file that you can upload on lambda.

### Create a lambda function and configs

- Go to the lambda page of AWS.
- Create a new function.
- Add your zip file on the lambda function.
- Make the role of cloud watch if you have not added User detail in code.
- Make lambda function execution time-limit 1-2 minutes.

### Notifiction config

This function will add a metric in the cloud watch if your webpage is up then you will send count `5` into the cloud watch metric or it will send `0` in metric.

Now you can create a cloud watch alarm on metrics and create SNS alert on email.

[https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-cloudwatch-createalarm.html](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-cloudwatch-createalarm.html)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update the tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
