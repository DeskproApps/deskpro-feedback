import { FallbackRender } from "@sentry/react";
import { H1, H2, Stack } from "@deskpro/deskpro-ui";

export const ErrorFallback: FallbackRender = ({
  error
}) => {
  const errorMessage = (error instanceof Error && error.message.trim()) ? error.message : "An unknown error occurred";
  
  return (
    <Stack vertical gap={10} padding={12} role="alert">
      <H1>Something went wrong:</H1>
      <H2 style={{ maxWidth: "100%" }}>
        {errorMessage}
      </H2>
    </Stack>
  );
};
