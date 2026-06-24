package ai.runapi.qwen2.types;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/** Parameters for edit image operations. */
public final class EditImageParams {
  private final String model;
  private final String prompt;
  private final String sourceImageUrl;
  private final String aspectRatio;
  private final String outputFormat;
  private final Integer seed;
  private final Boolean enableSafetyChecker;
  private final String callbackUrl;

  private EditImageParams(Builder builder) {
    this.model = builder.model;
    this.prompt = Qwen2ParamUtils.requireNonBlank(builder.prompt, "prompt");
    this.sourceImageUrl = Qwen2ParamUtils.requireNonBlank(builder.sourceImageUrl, "sourceImageUrl");
    this.aspectRatio = builder.aspectRatio;
    this.outputFormat = builder.outputFormat;
    this.seed = builder.seed;
    this.enableSafetyChecker = builder.enableSafetyChecker;
    this.callbackUrl = builder.callbackUrl;
  }

  /** Creates a new EditImageParams builder. */
  public static Builder builder() {
    return new Builder();
  }

  /** Returns the RunAPI action key for this request. */
  public String action() {
    return "qwen-2/edit-image";
  }

  /** Converts these parameters to the JSON request body shape. */
  public Map<String, Object> toMap() {
    Map<String, Object> raw = new LinkedHashMap<String, Object>();
    raw.put("model", Qwen2ParamUtils.wireValue(model));
    raw.put("prompt", Qwen2ParamUtils.wireValue(prompt));
    raw.put("source_image_url", Qwen2ParamUtils.wireValue(sourceImageUrl));
    raw.put("aspect_ratio", Qwen2ParamUtils.wireValue(aspectRatio));
    raw.put("output_format", Qwen2ParamUtils.wireValue(outputFormat));
    raw.put("seed", Qwen2ParamUtils.wireValue(seed));
    raw.put("enable_safety_checker", Qwen2ParamUtils.wireValue(enableSafetyChecker));
    raw.put("callback_url", Qwen2ParamUtils.wireValue(callbackUrl));
    return Qwen2ParamUtils.compact(raw);
  }



  /** Builder for {@link EditImageParams}. */
  public static final class Builder {
    private String model;
    private String prompt;
    private String sourceImageUrl;
    private String aspectRatio;
    private String outputFormat;
    private Integer seed;
    private Boolean enableSafetyChecker;
    private String callbackUrl;

    private Builder() {}

    /** Sets the model slug using a typed model value. */
    public Builder model(EditImageModel value) {
      this.model = java.util.Objects.requireNonNull(value, "model").value();
      return this;
    }

    /** Sets the model slug using a string value. */
    public Builder model(String value) {
      this.model = Qwen2ParamUtils.requireNonBlankTrim(value, "model");
      return this;
    }


    /** Sets the text prompt. */
    public Builder prompt(String value) {
      this.prompt = Qwen2ParamUtils.requireNonBlank(value, "prompt");
      return this;
    }

    /** Sets the source image URL. */
    public Builder sourceImageUrl(String value) {
      this.sourceImageUrl = Qwen2ParamUtils.requireNonBlank(value, "sourceImageUrl");
      return this;
    }

    /** Sets the output aspect ratio. */
    public Builder aspectRatio(String value) {
      this.aspectRatio = Qwen2ParamUtils.requireNonBlank(value, "aspectRatio");
      return this;
    }

    /** Sets the output format. */
    public Builder outputFormat(String value) {
      this.outputFormat = Qwen2ParamUtils.requireNonBlank(value, "outputFormat");
      return this;
    }

    /** Sets the random seed. */
    public Builder seed(int value) {
      this.seed = value;
      return this;
    }

    /** Sets the content safety checker toggle. */
    public Builder enableSafetyChecker(boolean value) {
      this.enableSafetyChecker = value;
      return this;
    }

    /** Sets the webhook URL for task completion notifications. */
    public Builder callbackUrl(String value) {
      this.callbackUrl = Qwen2ParamUtils.requireNonBlank(value, "callbackUrl");
      return this;
    }

    /** Builds immutable edit image parameters. */
    public EditImageParams build() {
      return new EditImageParams(this);
    }
  }
}
