# frozen_string_literal: true

module RunApi
  module Qwen2
    # Qwen2 text-to-image, remix-image, and edit-image API client.
    #
    # @example
    #   client = RunApi::Qwen2::Client.new(api_key: "your-api-key")
    #   result = client.edit_image.run(
    #     model: "qwen-2-edit-image",
    #     prompt: "Replace the background with a neon-lit city skyline",
    #     source_image_url: "https://cdn.runapi.ai/public/samples/input.jpg"
    #   )
    class Client
      # @return [Resources::TextToImage, Resources::RemixImage, Resources::EditImage] Image operations.
      attr_reader :text_to_image, :remix_image, :edit_image

      def initialize(api_key: nil, **options)
        @api_key = Core::Auth.resolve_api_key(api_key)

        client_options = Core::ClientOptions.new(api_key: @api_key, **options)
        http = client_options.http_client || Core::HttpClient.new(client_options)
        @text_to_image = Resources::TextToImage.new(http)
        @remix_image = Resources::RemixImage.new(http)
        @edit_image = Resources::EditImage.new(http)
      end
    end
  end
end
