const BASE_URL = process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000"

export function emailImageBaseUrl(filename: string): string {
  return `${BASE_URL}/email-static/${filename}`
}
