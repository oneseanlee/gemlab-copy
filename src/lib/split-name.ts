/**
 * Splits a full name string into first and last name.
 * "Sarah Mitchell" → { firstName: "Sarah", lastName: "Mitchell" }
 * "Sarah Jane Mitchell" → { firstName: "Sarah", lastName: "Jane Mitchell" }
 * "Sarah" → { firstName: "Sarah", lastName: null }
 */
export function splitName(fullName: string): { firstName: string; lastName: string | null } {
  const trimmed = fullName.trim();
  const spaceIndex = trimmed.indexOf(" ");

  if (spaceIndex === -1) {
    return { firstName: trimmed, lastName: null };
  }

  return {
    firstName: trimmed.slice(0, spaceIndex),
    lastName: trimmed.slice(spaceIndex + 1).trim() || null,
  };
}
