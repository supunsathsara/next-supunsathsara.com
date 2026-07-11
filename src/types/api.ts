export interface Monitor {
  status: number;
}

export interface UptimeRobotResponse {
  stat: string;
  monitors: Monitor[];
}

export interface TurnstileResponse {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
}

export type CorsHeaders = Record<string, string>;
