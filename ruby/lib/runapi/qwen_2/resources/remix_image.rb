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
        def run(**params)
          task = create(**params)
          poll_until_complete { get(task.id) }
        end

        # Create a remix-image task.
        #
        # @param params [Hash] remix-image parameters
        # @return [RunApi::Qwen2::Types::RemixImageResponse] task creation result with id
        def create(**params)
          params = compact_params(params)
          validate_params!(params)
          request(:post, ENDPOINT, body: params)
        end

        # Get remix-image status by task ID.
        #
        # @param id [String] task ID
        # @return [RunApi::Qwen2::Types::RemixImageResponse] current remix-image status
        def get(id)
          request(:get, "#{ENDPOINT}/#{id}")
        end

        private

        def validate_params!(params)
          raise Core::ValidationError, "model is required" unless param(params, :model)
          raise Core::ValidationError, "prompt is required" unless param(params, :prompt)
          raise Core::ValidationError, "source_image_url is required" unless param(params, :source_image_url)

          model = param(params, :model)
          unless Types::REMIX_IMAGE_MODELS.include?(model)
            raise Core::ValidationError, "Invalid model: #{model}. Must be one of: #{Types::REMIX_IMAGE_MODELS.join(", ")}"
          end

          validate_optional!(params, :output_format, Types::OUTPUT_FORMATS)
        end
      end
    end
  end
end
