
# TestSprite AI Testing Report(MCP)

---

## 1️⃣ Document Metadata
- **Project Name:** github-wrapped
- **Date:** 2026-03-28
- **Prepared by:** TestSprite AI Team

---

## 2️⃣ Requirement Validation Summary

#### Test TC001 Generate Wrapped from landing page and load results
- **Test Code:** [TC001_Generate_Wrapped_from_landing_page_and_load_results.py](./TC001_Generate_Wrapped_from_landing_page_and_load_results.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/bddb9256-7660-4b93-be7c-087ed9ecc9dd/74e58cf7-dc94-419a-ae9c-9773ff179cc6
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC002 Invalid username shows error UI on results page
- **Test Code:** [TC002_Invalid_username_shows_error_UI_on_results_page.py](./TC002_Invalid_username_shows_error_UI_on_results_page.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/bddb9256-7660-4b93-be7c-087ed9ecc9dd/1ee8188c-8dc4-480c-8ce2-69eb6d98f949
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC003 Username input trims surrounding whitespace
- **Test Code:** [TC003_Username_input_trims_surrounding_whitespace.py](./TC003_Username_input_trims_surrounding_whitespace.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/bddb9256-7660-4b93-be7c-087ed9ecc9dd/70ba578a-4d30-4de7-92f4-84067fefdd36
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC004 Empty username submission is blocked with validation feedback
- **Test Code:** [TC004_Empty_username_submission_is_blocked_with_validation_feedback.py](./TC004_Empty_username_submission_is_blocked_with_validation_feedback.py)
- **Test Error:** Submitting the form without entering a username did not show a validation/error message, even though the landing page remained visible.

Observations:
- The landing page content (title, description) and the form are visible.
- The username input (placeholder 'octocat') and the "Generate my Wrapped" button are present.
- No validation or error message is visible after repeatedly attempting to submit an empty username.
- The app remained on the landing page (no navigation away) after submissions.
- Multiple attempts to submit an empty username were made and the missing validation was consistently observed.

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/bddb9256-7660-4b93-be7c-087ed9ecc9dd/6f98f273-2e09-4ab8-906b-af04e98097da
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC005 Username accepts uppercase characters and still loads results
- **Test Code:** [TC005_Username_accepts_uppercase_characters_and_still_loads_results.py](./TC005_Username_accepts_uppercase_characters_and_still_loads_results.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/bddb9256-7660-4b93-be7c-087ed9ecc9dd/69b3f8e6-e018-44cb-88f2-95f4bdfece88
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC006 Landing page primary content loads
- **Test Code:** [TC006_Landing_page_primary_content_loads.py](./TC006_Landing_page_primary_content_loads.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/bddb9256-7660-4b93-be7c-087ed9ecc9dd/b4ce0e86-9cdb-464d-b686-cbc31e7f93c1
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC007 Wrapped page loads profile summary and computed metric cards for a known user
- **Test Code:** [TC007_Wrapped_page_loads_profile_summary_and_computed_metric_cards_for_a_known_user.py](./TC007_Wrapped_page_loads_profile_summary_and_computed_metric_cards_for_a_known_user.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/bddb9256-7660-4b93-be7c-087ed9ecc9dd/a3a46675-43d5-467c-b377-7ad4f05280e0
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC008 Wrapped page shows invalid username error state
- **Test Code:** [TC008_Wrapped_page_shows_invalid_username_error_state.py](./TC008_Wrapped_page_shows_invalid_username_error_state.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/bddb9256-7660-4b93-be7c-087ed9ecc9dd/5db59a25-1bd0-4dbb-968b-16b1d160e53f
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC009 Wrapped page renders multiple distinct metric cards
- **Test Code:** [TC009_Wrapped_page_renders_multiple_distinct_metric_cards.py](./TC009_Wrapped_page_renders_multiple_distinct_metric_cards.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/bddb9256-7660-4b93-be7c-087ed9ecc9dd/e05eb1c8-eeb4-4e17-b3a4-5af1b2a4b53e
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC010 Refreshless initial load shows results without requiring user interaction
- **Test Code:** [TC010_Refreshless_initial_load_shows_results_without_requiring_user_interaction.py](./TC010_Refreshless_initial_load_shows_results_without_requiring_user_interaction.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/bddb9256-7660-4b93-be7c-087ed9ecc9dd/fb31ae59-1eaa-4132-8e74-992857533efa
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC011 Wrapped page remains usable while content is loading
- **Test Code:** [TC011_Wrapped_page_remains_usable_while_content_is_loading.py](./TC011_Wrapped_page_remains_usable_while_content_is_loading.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/bddb9256-7660-4b93-be7c-087ed9ecc9dd/cef801c3-6b99-4432-8296-449b42b1e666
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC012 Advance carousel with right arrow key
- **Test Code:** [TC012_Advance_carousel_with_right_arrow_key.py](./TC012_Advance_carousel_with_right_arrow_key.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/bddb9256-7660-4b93-be7c-087ed9ecc9dd/690ec46f-b47d-4f4b-8ccd-27ab5adec396
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC013 Navigate carousel with previous and next controls
- **Test Code:** [TC013_Navigate_carousel_with_previous_and_next_controls.py](./TC013_Navigate_carousel_with_previous_and_next_controls.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/bddb9256-7660-4b93-be7c-087ed9ecc9dd/7a7f21f0-6c0f-4915-8b5b-6c1b207e906d
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC014 Jump to a specific card via progress dots
- **Test Code:** [TC014_Jump_to_a_specific_card_via_progress_dots.py](./TC014_Jump_to_a_specific_card_via_progress_dots.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/bddb9256-7660-4b93-be7c-087ed9ecc9dd/1ddc5545-ce19-4e4e-ab9c-aba0fd6af1d8
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC015 Reverse carousel with left arrow key
- **Test Code:** [TC015_Reverse_carousel_with_left_arrow_key.py](./TC015_Reverse_carousel_with_left_arrow_key.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/bddb9256-7660-4b93-be7c-087ed9ecc9dd/66fce098-94a8-43b8-b686-2dfee5523b39
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC016 Carousel remains functional after rapid sequential navigation
- **Test Code:** [TC016_Carousel_remains_functional_after_rapid_sequential_navigation.py](./TC016_Carousel_remains_functional_after_rapid_sequential_navigation.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/bddb9256-7660-4b93-be7c-087ed9ecc9dd/dee08265-164f-4d32-899f-15ae17d930a5
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC017 Export current metric card as PNG
- **Test Code:** [TC017_Export_current_metric_card_as_PNG.py](./TC017_Export_current_metric_card_as_PNG.py)
- **Test Error:** Exporting the focused metric card did not initiate a PNG download.

Observations:
- The "Descargar como imagen" button is present on the page and was clicked (clicked twice).
- After clicking, the UI displayed a generation state ("Generando...") but no further success message appeared.
- No <a> element with an href ending in ".png" was found on the page.
- No element with a download attribute was found, and no message like "Descarga" or "Descargado" was visible.
- The page still shows the Wrapped results and navigation elements, indicating the UI did not present a downloadable image link.

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/bddb9256-7660-4b93-be7c-087ed9ecc9dd/1527dede-92eb-450f-9f13-f8851635c57d
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC018 Open Twitter share intent from a focused card
- **Test Code:** [TC018_Open_Twitter_share_intent_from_a_focused_card.py](./TC018_Open_Twitter_share_intent_from_a_focused_card.py)
- **Test Error:** Clicking the 'Compartir en Twitter' button did not open a new Twitter share window.

Observations:
- The Wrapped results page for @octocat is visible and Card 2 is focused.
- The 'Compartir en Twitter' button was clicked while on Card 2.
- No new browser tab or window showing a Twitter share intent was opened.
- Browser tabs list shows only the current octocat page and one blank tab.
- The page remains on the Wrapped UI with the share buttons visible.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/bddb9256-7660-4b93-be7c-087ed9ecc9dd/c8101040-022e-48c5-a975-988560e46c5b
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC019 Open LinkedIn share dialog from a focused card
- **Test Code:** [TC019_Open_LinkedIn_share_dialog_from_a_focused_card.py](./TC019_Open_LinkedIn_share_dialog_from_a_focused_card.py)
- **Test Error:** Clicking the 'Compartir en LinkedIn' button did not open a new share window or tab.

Observations:
- The page displays the 'Compartir en LinkedIn' button and other share controls on the /octocat results page.
- Only one browser tab is listed (Tab F2F7: /octocat); no new tab or window appeared after the click.
- The interactive elements list includes indices for 'Descargar como imagen' [309] and 'Compartir en Twitter' [310], but the LinkedIn button lacks an index in the visible list.
- A click action for the LinkedIn button was recorded in the interaction history, but it produced no visible navigation or new tab.
- Because the LinkedIn button is not present as an interactive element in the browser_state, a reliable re-check could not be performed.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/bddb9256-7660-4b93-be7c-087ed9ecc9dd/26346b89-7422-4934-8098-58156160a6bb
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC020 Share action provides no in-app confirmation when popup is blocked
- **Test Code:** [TC020_Share_action_provides_no_in_app_confirmation_when_popup_is_blocked.py](./TC020_Share_action_provides_no_in_app_confirmation_when_popup_is_blocked.py)
- **Test Error:** Share buttons could not be tested because the Wrapped cards or share controls did not appear on the page after submitting the username.

Observations:
- The page currently displays the initial landing screen with the GitHub username input filled with 'octocat'.
- The interactive elements list contains only the username input; no generate button, wrapped cards, metric cards, or share (Twitter) buttons are present.
- A Generate action was previously invoked, but no wrapped content or share-confirmation UI rendered.
- No share-success confirmation UI was observed because the share controls could not be located.


- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/bddb9256-7660-4b93-be7c-087ed9ecc9dd/71509529-1eeb-4e10-9742-f56aa6d587d9
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC021 Switch carousel card and export reflects the currently focused card
- **Test Code:** [TC021_Switch_carousel_card_and_export_reflects_the_currently_focused_card.py](./TC021_Switch_carousel_card_and_export_reflects_the_currently_focused_card.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/bddb9256-7660-4b93-be7c-087ed9ecc9dd/7173e117-3807-41a0-9356-67bb588fc962
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC022 Results page shows share and export controls when Wrapped is displayed
- **Test Code:** [TC022_Results_page_shows_share_and_export_controls_when_Wrapped_is_displayed.py](./TC022_Results_page_shows_share_and_export_controls_when_Wrapped_is_displayed.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/bddb9256-7660-4b93-be7c-087ed9ecc9dd/e24f5ef5-3b66-48f9-8968-d1ec165ec54f
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC023 OG image endpoint returns an image response
- **Test Code:** [TC023_OG_image_endpoint_returns_an_image_response.py](./TC023_OG_image_endpoint_returns_an_image_response.py)
- **Test Error:** The OG image endpoint did not return an image for the valid username 'octocat'.

Observations:
- Navigated to http://localhost:3000/api/og?username=octocat and the page returned a 404.
- The visible content on the page shows "404" and "This page could not be found."
- The landing page input and the /octocat Wrapped page were previously confirmed to load successfully.
- No image content or image content-type was observed from the OG endpoint (an HTML 404 page was shown).
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/bddb9256-7660-4b93-be7c-087ed9ecc9dd/1018f275-ffd7-4a29-9ad9-3c1c1103f119
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---


## 3️⃣ Coverage & Matching Metrics

- **73.91** of tests passed

| Requirement        | Total Tests | ✅ Passed | ❌ Failed  |
|--------------------|-------------|-----------|------------|
| ...                | ...         | ...       | ...        |
---


## 4️⃣ Key Gaps / Risks
{AI_GNERATED_KET_GAPS_AND_RISKS}
---