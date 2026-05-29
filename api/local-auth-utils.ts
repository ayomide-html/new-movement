import * as jose from "jose";
import { eq } from "drizzle-orm";
import { env } from "./lib/env";
import { getDb } from "./queries/connection";
import * as schema from "@db/schema";
import type { LocalUser } from "@db/schema";

const JWT_ALG = "HS256";
const LOCAL_AUTH_SECRET = env.appSecret + "_local";

export async function signLocalToken(payload: {
  userId: number;
  username: string;
}): Promise<string> {
  const secret = new TextEncoder().encode(LOCAL_AUTH_SECRET);
  return new jose.SignJWT({ ...payload, type: "local" })
    .setProtectedHeader({ alg: JWT_ALG })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(secret);
}

export async function verifyLocalAuthToken(
  token: string,
): Promise<LocalUser | undefined> {
  if (!token) return undefined;
  try {
    const secret = new TextEncoder().encode(LOCAL_AUTH_SECRET);
    const { payload } = await jose.jwtVerify(token, secret, {
      algorithms: [JWT_ALG],
      clockTolerance: 60,
    });
    const userId = payload.userId as number;
    if (!userId) return undefined;

    const rows = await getDb()
      .select()
      .from(schema.localUsers)
      .where(eq(schema.localUsers.id, userId))
      .limit(1);

    return rows.at(0);
  } catch {
    return undefined;
  }
}
