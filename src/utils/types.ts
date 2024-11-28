export interface Service {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  apiKey: string | null;
  validUntil: Date;
}

export type NewService = Omit<
  Service,
  "id" | "createdAt" | "apiKey" | "validUntil"
>;
