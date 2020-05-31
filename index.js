const HTTPS = require("https");
const AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-1" }); // <-- Cloud Watch region name

const CLOUD_WATCH = new AWS.CloudWatch({
  apiVersion: "2010-08-01",
  accessKeyId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", // <-- access key
  secretAccessKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" // <-- secret access key
});

const URL = "https://example.com";
const SEARCH_STRING = "UA-2181092-2";
const VERSION = `1.0.0`;
const MetricName = "example_status";
const PageName = "example";

exports.handler = () => {
  // const main = () => {
  console.log(VERSION);
  HTTPS.get(URL, res => {
    let str = "";
    res.on("data", d => {
      str += d.toString();
    });
    res.on("end", () => {
      if (str.toString().indexOf(SEARCH_STRING) > -1) {
        console.log("Passed");
        let params = {
          MetricData: [
            {
              MetricName: MetricName,
              Dimensions: [
                {
                  Name: "PAGE_NAME",
                  Value: PageName
                }
              ],
              Unit: "Count",
              Value: 5
            }
          ],
          Namespace: "STATUS"
        };
        CLOUD_WATCH.putMetricData(params, function(err, data) {
          if (err) {
            console.log("Error", err);
            return;
          } else {
            console.log("Success", JSON.stringify(data));
            return;
          }
        });
      } else {
        console.log("Failed");
        let params = {
          MetricData: [
            {
              MetricName: MetricName,
              Dimensions: [
                {
                  Name: "PAGE_NAME",
                  Value: PageName
                }
              ],
              Unit: "Count",
              Value: 0
            }
          ],
          Namespace: "STATUS"
        };
        CLOUD_WATCH.putMetricData(params, function(err, data) {
          if (err) {
            console.log("Error", err);
            return;
          } else {
            console.log("Success", JSON.stringify(data));
            return;
          }
        });
      }
    });
  }).on("error", error => {
    console.log("Something wrong");
    let params = {
      MetricData: [
        {
          MetricName: MetricName,
          Dimensions: [
            {
              Name: "PAGE_NAME",
              Value: PageName
            }
          ],
          Unit: "Count",
          Value: 0
        }
      ],
      Namespace: "STATUS"
    };
    CLOUD_WATCH.putMetricData(params, function(err, data) {
      if (err) {
        console.log("Error", err);
        return;
      } else {
        console.log("Success", JSON.stringify(data));
        return;
      }
    });
  });
};
