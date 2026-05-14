import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Link,
    Preview,
    Text,
} from "@react-email/components";

export interface AdminWaitlistEmailProps {
  email: string;
  joinedAt: Date;
  source?: string;
}

export function AdminWaitlistEmail({
  email,
  joinedAt,
  source,
}: AdminWaitlistEmailProps) {
  const isoTimestamp = joinedAt.toISOString();
  const localTimestamp = joinedAt.toUTCString();

  return (
    <Html>
      <Head />
      <Preview>{`New waitlist signup: ${email}`}</Preview>
      <Body
        style={{
          backgroundColor: "#f6f6f6",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          padding: "24px 0",
        }}
      >
        <Container
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #eaeaea",
            borderRadius: "8px",
            margin: "0 auto",
            maxWidth: "560px",
            padding: "32px",
          }}
        >
          <Heading
            as="h1"
            style={{
              color: "#111111",
              fontSize: "20px",
              fontWeight: 600,
              margin: "0 0 16px",
            }}
          >
            New waitlist signup
          </Heading>

          <Text
            style={{ color: "#333333", fontSize: "14px", margin: "0 0 8px" }}
          >
            <strong>Email:</strong> {email}
          </Text>
          <Text
            style={{ color: "#333333", fontSize: "14px", margin: "0 0 8px" }}
          >
            <strong>Joined at:</strong> {localTimestamp} ({isoTimestamp})
          </Text>
          <Text
            style={{ color: "#333333", fontSize: "14px", margin: "0 0 8px" }}
          >
            <strong>Source:</strong> {source ?? "unknown"}
          </Text>

          <Hr style={{ borderColor: "#eaeaea", margin: "24px 0" }} />

          <Text style={{ color: "#666666", fontSize: "12px", margin: 0 }}>
            View the full audience in the{" "}
            <Link
              href="https://resend.com/audiences"
              style={{ color: "#0070f3" }}
            >
              Resend dashboard
            </Link>
            .
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
