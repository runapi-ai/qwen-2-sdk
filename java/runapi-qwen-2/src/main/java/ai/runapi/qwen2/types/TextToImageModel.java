package ai.runapi.qwen2.types;

import com.fasterxml.jackson.annotation.JsonCreator;

/** Model slug for text to image operations. */
public final class TextToImageModel extends Qwen2Value {
  /** qwen-2-text-to-image model slug. */
  public static final TextToImageModel QWEN_2_TEXT_TO_IMAGE = new TextToImageModel("qwen-2-text-to-image");

  /** Creates a model value from a literal model slug. */
  @JsonCreator
  public TextToImageModel(String value) {
    super(value);
  }
}
