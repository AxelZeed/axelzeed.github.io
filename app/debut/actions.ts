"use server";

import { USERS } from '@/lib/debut-data';

export async function verifyPasscode(input: string) {
  const normalized = input.trim().toLowerCase();
  
  if (USERS[normalized]) {
    return { 
      success: true, 
      userKey: normalized,
      userData: USERS[normalized]
    };
  }
  
  return { success: false, error: "INVALID_ACCESS_CODE" };
}
