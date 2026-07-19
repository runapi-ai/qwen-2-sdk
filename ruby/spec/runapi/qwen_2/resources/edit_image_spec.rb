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

    it "raises ValidationError when model is missing" do
      expect { edit_image.create(prompt: "test", source_image_url: "https://x.com/a.jpg") }
        .to raise_error(RunApi::Core::ValidationError, /model must be one of/)
    end

    it "raises ValidationError when prompt is missing" do
      expect { edit_image.create(model: "qwen-2-edit-image", source_image_url: "https://x.com/a.jpg") }
        .to raise_error(RunApi::Core::ValidationError, /prompt is required/)
    end

    it "raises ValidationError when source_image_url is missing" do
      expect { edit_image.create(model: "qwen-2-edit-image", prompt: "test") }
        .to raise_error(RunApi::Core::ValidationError, /source_image_url is required/)
    end

    it "raises ValidationError for invalid model" do
      expect { edit_image.create(model: "qwen-2-text-to-image", prompt: "test", source_image_url: "https://x.com/a.jpg") }
        .to raise_error(RunApi::Core::ValidationError, /model must be one of/)
    end

    it "raises ValidationError for invalid aspect_ratio" do
      expect { edit_image.create(model: "qwen-2-edit-image", prompt: "test", source_image_url: "https://x.com/a.jpg", aspect_ratio: "5:1") }
        .to raise_error(RunApi::Core::ValidationError, /aspect_ratio must be one of/)
    end

    it "raises ValidationError for invalid output_format" do
      expect { edit_image.create(model: "qwen-2-edit-image", prompt: "test", source_image_url: "https://x.com/a.jpg", output_format: "gif") }
        .to raise_error(RunApi::Core::ValidationError, /output_format must be one of/)
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
