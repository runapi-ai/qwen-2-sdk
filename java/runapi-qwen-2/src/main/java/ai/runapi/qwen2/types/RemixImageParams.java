package ai.runapi.qwen2.types;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/** Parameters for remix image operations. */
public final class RemixImageParams {
  private final String model;
  private final String prompt;
  private final String sourceImageUrl;
  private final Double strength;
  private final String outputFormat;
  private final String acceleration;
  private final String negativePrompt;
  private final Integer seed;
  private final Integer numInferenceSteps;
  private final Double guidanceScale;
  private final Boolean enableSafetyChecker;
  private final String callbackUrl;

  private RemixImageParams(Builder builder) {
    this.model = builder.model;
    this.prompt = Qwen2ParamUtils.requireNonBlank(builder.prompt, "prompt");
    this.sourceImageUrl = Qwen2ParamUtils.requireNonBlank(builder.sourceImageUrl, "sourceImageUrl");
    this.strength = builder.strength;
    this.outputFormat = builder.outputFormat;
    this.acceleration = builder.acceleration;
    this.negativePrompt = builder.negativePrompt;
    this.seed = builder.seed;
    this.numInferenceSteps = builder.numInferenceSteps;
    this.guidanceScale = builder.guidanceScale;
    this.enableSafetyChecker = builder.enableSafetyChecker;
    this.callbackUrl = builder.callbackUrl;
  }

  /** Creates a new RemixImageParams builder. */
  public static Builder builder() {
    return new Builder();
  }

  /** Returns the RunAPI action key for this request. */
  public String action() {
    return "qwen-2/remix-image";
  }

  /** Converts these parameters to the JSON request body shape. */
  public Map<String, Object> toMap() {
    Map<String, Object> raw = new LinkedHashMap<String, Object>();
    raw.put("model", Qwen2ParamUtils.wireValue(model));
    raw.put("prompt", Qwen2ParamUtils.wireValue(prompt));
    raw.put("source_image_url", Qwen2ParamUtils.wireValue(sourceImageUrl));
    raw.put("strength", Qwen2ParamUtils.wireValue(strength));
    raw.put("output_format", Qwen2ParamUtils.wireValue(outputFormat));
    raw.put("acceleration", Qwen2ParamUtils.wireValue(acceleration));
    raw.put("negative_prompt", Qwen2ParamUtils.wireValue(negativePrompt));
    raw.put("seed", Qwen2ParamUtils.wireValue(seed));
    raw.put("num_inference_steps", Qwen2ParamUtils.wireValue(numInferenceSteps));
    raw.put("guidance_scale", Qwen2ParamUtils.wireValue(guidanceScale));
    raw.put("enable_safety_checker", Qwen2ParamUtils.wireValue(enableSafetyChecker));
    raw.put("callback_url", Qwen2ParamUtils.wireValue(callbackUrl));
    return Qwen2ParamUtils.compact(raw);
  }



  /** Builder for {@link RemixImageParams}. */
  public static final class Builder {
    private String model;
    private String prompt;
    private String sourceImageUrl;
    private Double strength;
    private String outputFormat;
    private String acceleration;
    private String negativePrompt;
    private Integer seed;
    private Integer numInferenceSteps;
    private Double guidanceScale;
    private Boolean enableSafetyChecker;
    private String callbackUrl;

    private Builder() {}

    /** Sets the model slug using a typed model value. */
    public Builder model(RemixImageModel value) {
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

    /** Sets the strength. */
    public Builder strength(double value) {
      this.strength = value;
      return this;
    }

    /** Sets the output format. */
    public Builder outputFormat(String value) {
      this.outputFormat = Qwen2ParamUtils.requireNonBlank(value, "outputFormat");
      return this;
    }

    /** Sets the acceleration mode. */
    public Builder acceleration(String value) {
      this.acceleration = Qwen2ParamUtils.requireNonBlank(value, "acceleration");
      return this;
    }

    /** Sets the negative prompt describing what to avoid. */
    public Builder negativePrompt(String value) {
      this.negativePrompt = Qwen2ParamUtils.requireNonBlank(value, "negativePrompt");
      return this;
    }

    /** Sets the random seed. */
    public Builder seed(int value) {
      this.seed = value;
      return this;
    }

    /** Sets the number of inference steps. */
    public Builder numInferenceSteps(int value) {
      this.numInferenceSteps = value;
      return this;
    }

    /** Sets the guidance scale. */
    public Builder guidanceScale(double value) {
      this.guidanceScale = value;
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

    /** Builds immutable remix image parameters. */
    public RemixImageParams build() {
      return new RemixImageParams(this);
    }
  }
}
