export interface Service {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  apiKey: string;
}

export type NewService = Omit<Service, "id" | "createdAt" | "apiKey">;
