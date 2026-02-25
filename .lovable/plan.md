
# Remove Refund & Risk-Reversal Language from TPrime365 and NHTO Pages

Since the checkout flow now guides users to start the intake form first (to see if they qualify), all refund promises and money-back guarantees no longer apply. Here's every instance that needs to be removed or reworded across both pages.

---

## TPrime365 Page (`src/pages/TPrime365Page.tsx`)

### 1. FAQ Items (lines ~158-165)
- **Remove** the FAQ: "What happens if I'm not approved?" (mentions 100% refund)
- **Remove** the FAQ: "When do I pay?" (mentions refund if not approved)

### 2. Hero Section (line ~239)
- **Remove** the guarantee text: "If not approved by physician, fully refunded"

### 3. Hero Trust Badges (line ~256)
- **Replace** "Money-Back Guarantee" with "Physician-Reviewed" or another trust point (e.g., "HIPAA Compliant")

### 4. Steps Section (line ~286)
- **Reword** the physician review step to remove "If NOT approved: full refund processed immediately." Replace with something like "An independent licensed physician evaluates your case and determines if TPrime365 is right for you."

### 5. Steps Trust Line (line ~304)
- **Remove** "100% Money-Back Guarantee if physician does not approve" -- replace with a qualification-focused message like "Complete your intake to see if you qualify"

### 6. Comparison Table (line ~560)
- **Remove** the "Money-Back Guarantee" row entirely from the comparison table

### 7. Final CTA Section (line ~593)
- **Remove** "100% refunded if physician does not approve"

### 8. CTA Trust Points (line ~601)
- **Remove** "Full refund if not approved" -- replace with "See if you qualify in minutes"

### 9. CTA Trust Strip (line ~608)
- **Replace** "Money-Back Guarantee" with another trust point (e.g., "HIPAA Compliant")

### 10. Safety & Quality Grid (line ~651)
- **Remove** the "100% Money-Back Guarantee" badge -- replace with a quality-focused badge like "Patent-Pending Delivery" or "Clinical-Grade Formula"

---

## NHTO Page (`src/pages/NHTOPage.tsx`)

### 1. FAQ Item (line ~79)
- **Remove** "What happens if I'm not approved?" FAQ (mentions $140 refund)

### 2. Hero Consult Note (line ~142)
- **Replace** "Get medical consultation with refund protection" with "Complete your intake to see if you qualify"

### 3. Trust Strip Badge (line ~167)
- **Replace** "60-Day Guarantee / Money-back promise" with a non-refund trust point like "Physician-Reviewed"

### 4. Order Summary Refund Badges (lines ~386, ~394)
- **Remove** "NON-REFUNDABLE" and "REFUNDABLE IF NOT APPROVED" badge labels
- **Remove** the line "Yours to keep regardless of medical approval"

### 5. Risk-Free Promise Section (lines ~415-422)
- **Remove the entire section** (Section 11: "Our Risk-Free Promise") which discusses the $140 refund and "nothing to lose" messaging

---

## Summary of Changes
- **TPrime365Page.tsx**: ~10 edits to remove/replace refund language across hero, steps, comparison table, CTA, and safety sections
- **NHTOPage.tsx**: ~5 edits to remove/replace refund language across hero, trust strip, order summary, FAQ, and the entire Risk-Free Promise section

All replacements will use qualification-focused language (e.g., "See if you qualify," "Complete your intake") to align with the new flow where the intake form is the primary conversion goal.
