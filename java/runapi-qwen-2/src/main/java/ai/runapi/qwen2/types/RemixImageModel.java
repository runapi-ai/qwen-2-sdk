package ai.runapi.qwen2.types;

import com.fasterxml.jackson.annotation.JsonCreator;

/** Model slug for remix image operations. */
public final class RemixImageModel extends Qwen2Value {
  /** qwen-2-remix-image model slug. */
  public static final RemixImageModel QWEN_2_REMIX_IMAGE = new RemixImageModel("qwen-2-remix-image");

  /** Creates a model value from a literal model slug. */
  @JsonCreator
  public RemixImageModel(String value) {
    super(value);
  }
}
