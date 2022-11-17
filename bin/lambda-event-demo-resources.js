#!/usr/bin/env node

const cdk = require("aws-cdk-lib");
const { EventsStack } = require("../infra/events-stack");

const appEnv = process.env.APP_ENV;

const app = new cdk.App();
new EventsStack(app, "EventsStack", {
  stackName: `lambda-events-demo-resources-${appEnv}`,
  appEnv,
});
