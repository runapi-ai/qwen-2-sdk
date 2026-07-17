# frozen_string_literal: true

module RunApi
  module Qwen2
    module Resources
      # Qwen2 remix-image resource. Creates prompt-guided variations from a source image.
      class RemixImage
        include RunApi::Core::ResourceHelpers

        ENDPOINT = "/api/v1/qwen_2/remix_image"

        RESPONSE_CLASS = Types::RemixImageResponse
        COMPLETED_RESPONSE_CLASS = Types::CompletedRemixImageResponse

        def initialize(http)
          @http = http
        end

        # Remix an image and wait until complete.
        #
        # @param params [Hash] remix-image parameters
        # @return [RunApi::Qwen2::Types::CompletedRemixImageResponse] completed remix-image result
        def run(options: nil, **params)
          task = create(options: options, **params)
          poll_until_complete { get(task.id, options: options) }
        end

        # Create a remix-image task.
        #
        # @param params [Hash] remix-image parameters
        # @return [RunApi::Qwen2::Types::RemixImageResponse] task creation result with id
        def create(options: nil, **params)
          params = compact_params(params)
          validate_contract!(CONTRACT["remix-image"], params)
          request(:post, ENDPOINT, body: params, options: options)
        end

        # Get remix-image status by task ID.
        #
        # @param id [String] task ID
        # @return [RunApi::Qwen2::Types::RemixImageResponse] current remix-image status
        def get(id, options: nil)
          request(:get, "#{ENDPOINT}/#{id}", options: options)
        end
      end
    end
  end
end
