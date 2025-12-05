# Project Scope and Purpose: NullPoint

## 1. Problem Definition
Due to "Positive Publication Bias" in scientific research, experiments resulting in failure (negative findings) are often unpublished and shelved. This leads to two major problems:
1.  **Financial Loss:** Research companies cannot recover the money invested in failed projects (Sunk Cost).
2.  **Time Waste:** Other researchers elsewhere in the world repeat a method that has already been tried and failed, wasting time.

## 2. Solution: NullPoint
NullPoint is a marketplace where negative data is traded as a valuable asset.

*   **Sellers (Academics/Startups):** Upload their failed experiments (raw data, methodology), anonymize them, and sell them to generate revenue.
*   **Buyers (Big Pharma/Institutions):** Purchase this data showing "what doesn't work" to avoid wasting time in their own R&D processes. They also need negative data to train machine learning models.

## 3. Target Audience (Personas)

*   **Dr. Demo Researcher (Seller):** A researcher whose academic funding is running out and has thousands of unpublished failed experiment data points. Wants to secure new funding for their lab by selling data.
*   **PharmaCorp R&D Lead (Buyer):** Working on a new drug molecule. Willing to pay $15,000 to learn that competitors tried and failed with this molecule 2 years ago; because this information will save them 2 years and $2 Million.

## 4. MVP (Minimum Viable Product) Scope

This prototype is designed to validate the core functions of the business idea:

### In Scope
*   **Data Listing:** Categorized experiment cards.
*   **Detailed Review:** Preview tables and charts to understand the quality of the dataset.
*   **Purchase Simulation:** Instant purchasing experience with a credit system.
*   **Verification Indicators:** Trust signals like "Peer Reviewed", "AI Verified".
*   **Upload Flow:** Simulation of the seller's data entry process (Metadata, File, Anonymization).

### Out of Scope (Future Phases)
*   Real file hosting (AWS S3, etc.).
*   Real payment system integration (Stripe).
*   Blockchain-based IP (Intellectual Property) tracking.
*   Real user authentication (Auth0).

## 5. Success Criteria
The project is considered successful if a user can smoothly complete the following flow:
`Home Page -> Search Relevant Experiment -> Review Details (Chart/Table) -> Purchase with Credits -> View in Dashboard`