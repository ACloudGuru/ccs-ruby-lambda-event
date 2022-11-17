const { Stack, Duration, CfnOutput } = require("aws-cdk-lib");
const { EventBus, Rule } = require("aws-cdk-lib/aws-events");
const { SqsQueue } = require("aws-cdk-lib/aws-events-targets");
const { Queue } = require("aws-cdk-lib/aws-sqs");

class EventsStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    const demoBus = new EventBus(this, "LambdaEventsDemoBus", {
      eventBusName: `lambda-events-demo-bus-${props.appEnv}`,
    });

    const demoQueue = new Queue(this, "LambdaEventsDemoQueue", {
      queueName: `lambda-events-demo-queue`,
    });

    new Rule(this, "DemoRule", {
      eventBus: demoBus,
      eventPattern: {
        source: ["demo-lambda-event"],
      },
      targets: [new SqsQueue(demoQueue)],
    });

    new CfnOutput(this, "DemoQueueArn", {
      value: demoQueue.queueArn,
    });
  }
}

module.exports = { EventsStack };
