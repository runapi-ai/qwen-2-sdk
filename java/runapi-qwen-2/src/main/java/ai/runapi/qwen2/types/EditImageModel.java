package ai.runapi.qwen2.types;

import com.fasterxml.jackson.annotation.JsonCreator;

/** Model slug for edit image operations. */
public final class EditImageModel extends Qwen2Value {
  /** qwen-2-edit-image model slug. */
  public static final EditImageModel QWEN_2_EDIT_IMAGE = new EditImageModel("qwen-2-edit-image");

  /** Creates a model value from a literal model slug. */
  @JsonCreator
  public EditImageModel(String value) {
    super(value);
  }
}
