# frozen_string_literal: true

module RunApi
  module Qwen2
    module Types
      MODELS = %w[qwen-2-edit-image qwen-2-text-to-image qwen-2-remix-image].freeze
      EDIT_MODELS = %w[qwen-2-edit-image].freeze
      TEXT_TO_IMAGE_MODELS = %w[qwen-2-text-to-image].freeze
      REMIX_IMAGE_MODELS = %w[qwen-2-remix-image].freeze
      EDIT_IMAGE_ASPECT_RATIOS = %w[1:1 2:3 3:2 3:4 4:3 9:16 16:9 21:9].freeze
      TEXT_TO_IMAGE_ASPECT_RATIOS = %w[1:1 3:4 4:3 9:16 16:9].freeze
      OUTPUT_FORMATS = %w[jpeg png].freeze

      class Image < RunApi::Core::BaseModel
        optional :url, String
      end

      class ImageTaskResponse < RunApi::Core::TaskResponse
        required :id, String
        optional :status, String, enum: -> { RunApi::Core::TaskResponse::Status::ALL }
        optional :images, [-> { Image }]
        optional :error, String
      end

      class TextToImageResponse < ImageTaskResponse; end
      class RemixImageResponse < ImageTaskResponse; end
      class EditImageResponse < ImageTaskResponse; end

      class CompletedTextToImageResponse < TextToImageResponse
        required :images, [-> { Image }]
      end

      class CompletedRemixImageResponse < RemixImageResponse
        required :images, [-> { Image }]
      end

      class CompletedEditImageResponse < EditImageResponse
        required :images, [-> { Image }]
      end
    end
  end
end
