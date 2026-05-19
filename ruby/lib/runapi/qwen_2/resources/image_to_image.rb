# frozen_string_literal: true

module RunApi
  module Qwen2
    module Resources
      # Qwen2 image-to-image resource. Transforms images with natural-language prompts.
      class ImageToImage
        include RunApi::Core::ResourceHelpers

        ENDPOINT = "/api/v1/qwen_2/image_to_image"

        RESPONSE_CLASS = Types::ImageToImageResponse
        COMPLETED_RESPONSE_CLASS = Types::CompletedImageToImageResponse

        def initialize(http)
          @http = http
        end

        # Transform an image and wait until complete.
        #
        # @param params [Hash] image-to-image parameters
        # @return [RunApi::Qwen2::Types::CompletedImageToImageResponse] completed image-to-image result
        def run(**params)
          task = create(**params)
          poll_until_complete { get(task.id) }
        end

        # Create an image-to-image task.
        #
        # @param params [Hash] image-to-image parameters
        # @return [RunApi::Qwen2::Types::ImageToImageResponse] task creation result with id
        def create(**params)
          params = compact_params(params)
          validate_params!(params)
          request(:post, ENDPOINT, body: params)
        end

        # Get image-to-image status by task ID.
        #
        # @param id [String] task ID
        # @return [RunApi::Qwen2::Types::ImageToImageResponse] current image-to-image status
        def get(id)
          request(:get, "#{ENDPOINT}/#{id}")
        end

        private

        def validate_params!(params)
          raise Core::ValidationError, "model is required" unless param(params, :model)
          raise Core::ValidationError, "prompt is required" unless param(params, :prompt)
          raise Core::ValidationError, "image_url is required" unless param(params, :image_url)

          model = param(params, :model)
          unless Types::IMAGE_TO_IMAGE_MODELS.include?(model)
            raise Core::ValidationError, "Invalid model: #{model}. Must be one of: #{Types::IMAGE_TO_IMAGE_MODELS.join(", ")}"
          end

          validate_optional!(params, :output_format, Types::OUTPUT_FORMATS)
        end
      end
    end
  end
end
