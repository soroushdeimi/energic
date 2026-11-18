/**
 * Typed API client for the Energic backend.
 *
 * The response shapes are fixed by the shared API contract (prompts/00-shared.md).
 * The base URL is read from NEXT_PUBLIC_API_URL (default: http://localhost:8000).
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export interface Seo {
  title: string;
  description: string;
  og_image: string;
}

export interface PageSection {
  key: string;
  data: Record<string, unknown>;
}

export interface PageDetail {
  slug: string;
  seo: Seo;
  sections: PageSection[];
}

export interface Company {
  name: string;
  logo: string;
  url: string;
}

export interface CompaniesData {
  shareholders: Company[];
  residents: Company[];
}

export interface Capability {
  title: string;
  icon: string;
  description: string;
}

export interface CoworkingData {
  gallery: { image: string; alt: string }[];
  amenities: { icon: string; label: string }[];
}

export interface NewsItem {
  slug: string;
  title: string;
  cover: string;
  excerpt: string;
  published_at: string;
}

export type LeadKind = "establishment" | "contact";

export interface LeadPayload {
  name: string;
  team?: string;
  phone: string;
  email?: string;
  message: string;
  kind: LeadKind;
}

export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
  });
  if (!response.ok) {
    throw new ApiError(response.status, `API request failed: ${path} -> ${response.status}`);
  }
  return (await response.json()) as T;
}

export function getPage(slug: string): Promise<PageDetail> {
  return request<PageDetail>(`/api/pages/${slug}/`);
}

export function getCompanies(): Promise<CompaniesData> {
  return request<CompaniesData>("/api/companies/");
}

export function getCapabilities(): Promise<Capability[]> {
  return request<Capability[]>("/api/capabilities/");
}

export function getCoworking(): Promise<CoworkingData> {
  return request<CoworkingData>("/api/coworking/");
}

export function getNews(): Promise<NewsItem[]> {
  return request<NewsItem[]>("/api/news/");
}

export function createLead(payload: LeadPayload): Promise<{ ok: boolean }> {
  return request<{ ok: boolean }>("/api/leads/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
