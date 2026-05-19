# frozen_string_literal: true

module RunApi
  module Qwen2
    module Resources
      # Qwen2 text-to-image resource. Generates images with natural-language prompts.
      class TextToImage
        include RunApi::Core::ResourceHelpers

        ENDPOINT = "/api/v1/qwen_2/text_to_image"

        RESPONSE_CLASS = Types::TextToImageResponse
        COMPLETED_RESPONSE_CLASS = Types::CompletedTextToImageResponse

        def initialize(http)
          @http = http
        end

        # Generate an image and wait until complete.
        #
        # @param params [Hash] text-to-image parameters
        # @return [RunApi::Qwen2::Types::CompletedTextToImageResponse] completed text-to-image result
        def run(**params)
          task = create(**params)
          poll_until_complete { get(task.id) }
        end

        # Create a text-to-image task.
        #
        # @param params [Hash] text-to-image parameters
        # @return [RunApi::Qwen2::Types::TextToImageResponse] task creation result with id
        def create(**params)
          params = compact_params(params)
          validate_params!(params)
          request(:post, ENDPOINT, body: params)
        end

        # Get text-to-image status by task ID.
        #
        # @param id [String] task ID
        # @return [RunApi::Qwen2::Types::TextToImageResponse] current text-to-image status
        def get(id)
          request(:get, "#{ENDPOINT}/#{id}")
        end

        private

        def validate_params!(params)
          raise Core::ValidationError, "model is required" unless param(params, :model)
          raise Core::ValidationError, "prompt is required" unless param(params, :prompt)
          model = param(params, :model)
          unless Types::TEXT_TO_IMAGE_MODELS.include?(model)
            raise Core::ValidationError, "Invalid model: #{model}. Must be one of: #{Types::TEXT_TO_IMAGE_MODELS.join(", ")}"
          end

          validate_optional!(params, :image_size, Types::QWEN_IMAGE_SIZES)
          validate_optional!(params, :output_format, Types::OUTPUT_FORMATS)
        end
      end
    end
  end
end
