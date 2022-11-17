# frozen_string_literal: true

require 'active_support/all'
require 'aws-sdk-eventbridge'

def handler(event:, context:)
  puts event.to_json
  puts context.to_json
  eb_client.put_events(entries: [eb_entry])
end

def eb_client
  Aws::EventBridge::Client.new
end

def eb_entry
  {
    time: Time.now,
    source: 'demo-lambda-event',
    detail_type: 'demo-event',
    detail: {
      here: 'is some message'
    }.to_json,
    event_bus_name: 'lambda-events-demo-bus-dev'
  }
end
