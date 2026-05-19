# frozen_string_literal: true

module RunApi
  module Qwen2
    # Qwen2 text-to-image, image-to-image, and edit-image API client.
    #
    # @example
    #   client = RunApi::Qwen2::Client.new(api_key: "your-api-key")
    #   result = client.edit_image.run(
    #     model: "qwen-2-image-edit",
    #     prompt: "Replace the background with a neon-lit city skyline",
    #     image_url: "https://example.com/input.jpg"
    #   )
    class Client
      # @return [Resources::TextToImage, Resources::ImageToImage, Resources::EditImage] Image operations.
      attr_reader :text_to_image, :image_to_image, :edit_image

      def initialize(api_key: nil, **options)
        @api_key = Core::Auth.resolve_api_key(api_key)

        client_options = Core::ClientOptions.new(api_key: @api_key, **options)
        http = client_options.http_client || Core::HttpClient.new(client_options)
        @text_to_image = Resources::TextToImage.new(http)
        @image_to_image = Resources::ImageToImage.new(http)
        @edit_image = Resources::EditImage.new(http)
      end
    end
  end
end
