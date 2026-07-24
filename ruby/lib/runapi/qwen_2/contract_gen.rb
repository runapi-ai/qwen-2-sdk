# frozen_string_literal: true

module RunApi
  module Qwen2
    CONTRACT = {
      "edit-image" => {
        "models" => ["qwen-2-edit-image"],
        "fields_by_model" => {
          "qwen-2-edit-image" => {
            "aspect_ratio" => {
              "enum" => ["1:1", "2:3", "3:2", "3:4", "4:3", "9:16", "16:9", "21:9"]
            },
            "output_format" => {
              "enum" => ["jpeg", "png"]
            },
            "prompt" => {
              "required" => true
            },
            "seed" => {
              "type" => "integer"
            },
            "source_image_url" => {
              "required" => true
            }
          }
        }
      },
      "text-to-image" => {
        "models" => ["qwen-2-text-to-image"],
        "fields_by_model" => {
          "qwen-2-text-to-image" => {
            "aspect_ratio" => {
              "enum" => ["1:1", "3:4", "4:3", "9:16", "16:9"]
            },
            "output_format" => {
              "enum" => ["png", "jpeg"]
            },
            "prompt" => {
              "required" => true
            },
            "seed" => {
              "type" => "integer"
            }
          }
        }
      }
    }.freeze
  end
end
