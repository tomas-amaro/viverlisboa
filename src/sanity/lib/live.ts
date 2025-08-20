// Standard Sanity client - live features disabled for now
import { client } from "./client";

// Use regular client.fetch for now
export const sanityFetch = client.fetch.bind(client);

// Placeholder component
export const SanityLive = () => null;
