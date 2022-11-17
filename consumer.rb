# frozen_string_literal: true

require 'active_support/all'

def handler(event:, context:)
  puts event.to_json
  puts context.to_json
end
