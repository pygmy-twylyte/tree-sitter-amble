; Increase indentation for block contents
[
  (game_block)
  (player_block)
  (scoring_block)
  (room_block)
  (item_block)
  (npc_block)
  (trigger_block)
  (goal_block)
  (spinner_block)
  (ovl_block)
  (exit_block)
  (flag_binary_block)
  (presence_pair_block)
  (npc_state_set_block)
  (cond_block)
  (consumable_block)
  (item_patch_block)
  (room_patch_block)
  (npc_patch_block)
  (npc_dialogue_block)
] @indent

; Increase indentation for parenthetical lists
[
  (set_list)
  (cond_any_group)
  (cond_all_group)
  (required_items_stmt)
  (required_flags_stmt)
] @indent

; Opening braces increase indentation
"{" @indent

; Closing braces decrease indentation
"}" @dedent

; Opening parentheses increase indentation
"(" @indent

; Closing parentheses decrease indentation
")" @dedent

; Room statements should align with their block
(_room_stmt) @return

; Item statements should align with their block
(_item_stmt) @return

; Game statements should align with their block
(_game_stmt) @return

; Player statements should align with their block
(_player_stmt) @return

; Scoring statements should align with their block
(_scoring_stmt) @return

; NPC statements should align with their block
(_npc_stmt) @return

; Goal statements should align with their block
(_goal_stmt) @return

; Spinner statements should align with their block
(spinner_entry) @return

; Exit statements should align with their block
(exit_stmt) @return

; Overlay text statements should align with their block
(ovl_text_stmt) @return

; NPC state set lines should align with their block
(npc_state_set_line) @return

; Patch statements should align with their block
(_item_patch_stmt) @return

(_room_patch_stmt) @return

(_npc_patch_stmt) @return

; Consumable statements should align with their block
(_consumable_stmt) @return

; Dialogue lines should align with their block
(npc_dialogue) @return

; Action statements should align properly
(do_action) @return

(_action_type) @return

(_trigger_stmt) @return

; When conditions should align with trigger
(when_cond) @return

; Trigger conditions should align with if blocks
(trigger_cond) @return
