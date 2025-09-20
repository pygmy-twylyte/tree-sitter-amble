; Increase indentation for block contents
[
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

; Conditional structures
(cond_block
  condition: (_) @branch
  consequence: (_) @indent)

; Trigger statements should align with their block
(trigger_stmt) @return

; Room statements should align with their block
(_room_stmt) @return

; Item statements should align with their block
(item_stmt) @return

; NPC statements should align with their block
(npc_stmt) @return

; Goal statements should align with their block
(goal_stmt) @return

; Spinner statements should align with their block
(spinner_stmt) @return

; Exit statements should align with their block
(exit_stmt) @return

; Overlay text statements should align with their block
(ovl_text_stmt) @return

; NPC state set lines should align with their block
(npc_state_set_line) @return

; Action statements should align properly
(do_action) @return
(action_type) @return

; When conditions should align with trigger
(when_cond) @return

; Trigger conditions should align with if blocks
(trigger_cond) @return

; Overlay conditions should align with overlay blocks
(_ovl_cond) @return
