import type { Session } from '@supabase/supabase-js';

/**
 * Optimized function to update user profile using RAF
 */
export function scheduleProfileUpdate(
  updateFn: (session: Session) => Promise<void>,
  session: Session
): void {
  // Use requestIdleCallback if available, otherwise fallback to RAF
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
      updateFn(session);
    });
  } else {
    requestAnimationFrame(() => {
      updateFn(session);
    });
  }
}

/**
 * Creates an optimized event handler that uses RAF for non-critical updates
 */
export function createOptimizedAuthHandler(
  handler: (event: string, session: Session | null) => Promise<void>
): (event: string, session: Session | null) => Promise<void> {
  return async (event: string, session: Session | null) => {
    // For critical updates (like session state), execute immediately
    if (event === 'SIGNED_OUT' || !session) {
      await handler(event, session);
      return;
    }

    // For non-critical updates, schedule them in RAF
    requestAnimationFrame(async () => {
      await handler(event, session);
    });
  };
}
