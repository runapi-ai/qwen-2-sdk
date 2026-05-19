# frozen_string_literal: true

module RunApi
  module Qwen2
    module Resources
      # Qwen2 edit-image resource. Edits images with natural-language prompts.
      class EditImage
        include RunApi::Core::ResourceHelpers

        ENDPOINT = "/api/v1/qwen_2/edit_image"

        RESPONSE_CLASS = Types::EditImageResponse
        COMPLETED_RESPONSE_CLASS = Types::CompletedEditImageResponse

        def initialize(http)
          @http = http
        end

        # Edit an image and wait until complete.
        #
        # @param params [Hash] edit-image parameters
        # @return [RunApi::Qwen2::Types::CompletedEditImageResponse] completed edit-image result
        def run(**params)
          task = create(**params)
          poll_until_complete { get(task.id) }
        end

        # Create an edit-image task.
        #
        # @param params [Hash] edit-image parameters
        # @return [RunApi::Qwen2::Types::EditImageResponse] task creation result with id
        def create(**params)
          params = compact_params(params)
          validate_params!(params)
          request(:post, ENDPOINT, body: params)
        end

        # Get edit-image status by task ID.
        #
        # @param id [String] task ID
        # @return [RunApi::Qwen2::Types::EditImageResponse] current edit-image status
        def get(id)
          request(:get, "#{ENDPOINT}/#{id}")
        end

        private

        def validate_params!(params)
          raise Core::ValidationError, "model is required" unless param(params, :model)
          raise Core::ValidationError, "prompt is required" unless param(params, :prompt)
          raise Core::ValidationError, "image_url is required" unless param(params, :image_url)

          model = param(params, :model)
          unless Types::EDIT_MODELS.include?(model)
            raise Core::ValidationError, "Invalid model: #{model}. Must be one of: #{Types::EDIT_MODELS.join(", ")}"
          end

          validate_optional!(params, :image_size, Types::IMAGE_SIZES)
          validate_optional!(params, :output_format, Types::OUTPUT_FORMATS)
        end
      end
    end
  end
end
