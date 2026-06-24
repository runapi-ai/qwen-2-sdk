package ai.runapi.qwen2;

import ai.runapi.core.BaseClient;
import ai.runapi.core.ClientOptions;
import ai.runapi.core.http.HttpTransport;
import java.net.URI;
import ai.runapi.qwen2.resources.EditImageResource;
import ai.runapi.qwen2.resources.RemixImageResource;
import ai.runapi.qwen2.resources.TextToImageResource;

/** Qwen2 model-family Java SDK client. */
public final class Qwen2Client extends BaseClient {
  private final EditImageResource editImage;
  private final RemixImageResource remixImage;
  private final TextToImageResource textToImage;

  private Qwen2Client(ClientOptions options) {
    super(options);
    this.editImage = new EditImageResource(transport(), options());
    this.remixImage = new RemixImageResource(transport(), options());
    this.textToImage = new TextToImageResource(transport(), options());
  }

  /** Creates a new Qwen2Client builder. */
  public static Builder builder() {
    return new Builder();
  }

  /** Edit Image operations. */
  public EditImageResource editImage() {
    return editImage;
  }

  /** Remix Image operations. */
  public RemixImageResource remixImage() {
    return remixImage;
  }

  /** Text To Image operations. */
  public TextToImageResource textToImage() {
    return textToImage;
  }

  /** Builder for {@link Qwen2Client}. */
  public static final class Builder extends BaseClient.Builder<Builder> {
    private Builder() {}

    /** Sets the API key. If omitted, the SDK reads {@code RUNAPI_API_KEY}. */
    @Override
    public Builder apiKey(String value) {
      return super.apiKey(value);
    }

    /** Sets the RunAPI base URL. If omitted, the SDK reads {@code RUNAPI_BASE_URL}. */
    @Override
    public Builder baseUrl(String value) {
      return super.baseUrl(value);
    }

    /** Sets the RunAPI base URL from a URI. */
    @Override
    public Builder baseUrl(URI value) {
      return super.baseUrl(value);
    }

    /** Sets a custom HTTP transport. User-provided transports are not closed by SDK clients. */
    @Override
    public Builder transport(HttpTransport value) {
      return super.transport(value);
    }

    /** Builds an immutable Qwen2Client. */
    @Override
    public Qwen2Client build() {
      return new Qwen2Client(options.build());
    }
  }
}
