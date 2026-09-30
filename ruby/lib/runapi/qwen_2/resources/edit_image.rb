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
        def run(options: nil, **params)
          task = create(options: options, **params)
          poll_until_complete { get(task.id, options: options) }
        end

        # Create an edit-image task.
        #
        # @param params [Hash] edit-image parameters
        # @return [RunApi::Qwen2::Types::EditImageResponse] task creation result with id
        def create(options: nil, **params)
          params = compact_params(params)
          request(:post, ENDPOINT, body: params, options: options)
        end

        # Get edit-image status by task ID.
        #
        # @param id [String] task ID
        # @return [RunApi::Qwen2::Types::EditImageResponse] current edit-image status
        def get(id, options: nil)
          request(:get, "#{ENDPOINT}/#{id}", options: options)
        end
      end
    end
  end
end
