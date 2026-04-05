"use client";

import { Button } from "@/components/ui/button";

export function ErrorState(props: { message: string; onRetry?: () => void }) {
  return (
    <div className="feedback-container">
      <p className="feedback-error-panel" role="alert">
        {props.message}
      </p>
      {props.onRetry ? (
        <div className="feedback-action-row">
          <Button type="button" onClick={props.onRetry}>
            Try again
          </Button>
        </div>
      ) : null}
    </div>
  );
}
