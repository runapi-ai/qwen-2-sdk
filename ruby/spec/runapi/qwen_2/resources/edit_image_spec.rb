# frozen_string_literal: true

require "spec_helper"

RSpec.describe RunApi::Qwen2::Resources::EditImage do
  let(:http) { instance_double(RunApi::Core::HttpClient) }
  let(:edit_image) { described_class.new(http) }
  let(:endpoint) { "/api/v1/qwen_2/edit_image" }

  describe "#create" do
    it "POSTs to the correct endpoint with params" do
      params = {
        model: "qwen-2-edit-image",
        prompt: "make it pop",
        source_image_url: "https://cdn.runapi.ai/public/samples/input.jpg",
        aspect_ratio: "1:1"
      }
      expect(http).to receive(:request).with(:post, endpoint, body: params)
        .and_return("id" => "task-1")

      result = edit_image.create(**params)
      expect(result).to be_a(RunApi::Qwen2::Types::EditImageResponse)
      expect(result.id).to eq("task-1")
    end
  end

  describe "#get" do
    it "GETs the correct endpoint" do
      expect(http).to receive(:request).with(:get, "#{endpoint}/task-1")
        .and_return("id" => "task-1", "status" => "completed", "images" => [{"url" => "https://file.runapi.ai/out.png"}])

      result = edit_image.get("task-1")
      expect(result).to be_a(RunApi::Qwen2::Types::EditImageResponse)
      expect(result.id).to eq("task-1")
      expect(result.status).to eq("completed")
      expect(result.images.first.url).to eq("https://file.runapi.ai/out.png")
    end
  end
end
