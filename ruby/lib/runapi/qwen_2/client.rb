# frozen_string_literal: true

module RunApi
  module Qwen2
    # Qwen 2 image generation and editing API client.
    #
    # Text-to-image generation and targeted modifications to source images.
    #
    # @example
    #   client = RunApi::Qwen2::Client.new(api_key: "your-api-key")
    #   result = client.edit_image.run(
    #     model: "qwen-2-edit-image",
    #     prompt: "Replace the background with a neon-lit city skyline",
    #     source_image_url: "https://cdn.runapi.ai/public/samples/input.jpg"
    #   )
    class Client < RunApi::Core::Client
      # @return [Resources::TextToImage] Generate images from text prompts.
      attr_reader :text_to_image
      # @return [Resources::EditImage] Apply targeted edits to a source image using natural-language prompts.
      attr_reader :edit_image

      def initialize(api_key: nil, **options)
        super
        @text_to_image = Resources::TextToImage.new(http)
        @edit_image = Resources::EditImage.new(http)
      end
    end
  end
end
