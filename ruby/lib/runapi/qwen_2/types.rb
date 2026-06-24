# frozen_string_literal: true

module RunApi
  module Qwen2
    module Types
      # A single generated image result.
      class Image < RunApi::Core::BaseModel
        optional :url, String
      end

      # Shared task result for all Qwen 2 image operations.
      class ImageTaskResponse < RunApi::Core::TaskResponse
        required :id, String
        optional :status, String, enum: -> { RunApi::Core::TaskResponse::Status::ALL }
        optional :images, [-> { Image }]
        optional :error, String
      end

      class TextToImageResponse < ImageTaskResponse; end
      class RemixImageResponse < ImageTaskResponse; end
      class EditImageResponse < ImageTaskResponse; end

      # Narrowed responses returned by +run()+ methods once polling observes
      # +status: "completed"+. +images+ is required so consumers never
      # have to null-check it on a successful task.
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
