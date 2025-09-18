/**
 * @file DSL for the Amble game engine.
 * @author djvb <djvbmd@protonmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "amble",

  word: ($) => $.identifier,
  extras: ($) => [$.comment, /[\s\r\n\t]/],

  rules: {
    // TODO: add the actual grammar rules
    source_file: ($) =>
      repeat(
        choice(
          $.set_decl,
          $.room_def,
          $.item_def,
          $.npc_def,
          $.trigger_def,
          $.spinner_def,
          $.goal_def,
        ),
      ),

    comment: ($) => token(seq("#", /.*/)),

    identifier: ($) => /[a-zA-Z0-9_\-:#]+/,

    number: ($) => /-?\d+/,

    // Strings: single-line '…' and "…", multi-line """…""" and '''…''', and raw r#"…"#
    string: ($) =>
      choice(
        token(/\"([^\"\\\n]|\\.)*\"/),
        token(/'([^'\\\n]|\\.)*'/),
        token(
          seq(
            '"""',
            repeat(choice(/[^\"]/, /\"[^\"]/, /\"\"[^\"]/, /\\./)),
            '"""',
          ),
        ),
        token(
          seq("'''", repeat(choice(/[^']/, /'[^']/, /''[^']/, /\\./)), "'''"),
        ),
        token(seq('r#"', repeat(choice(/[^\"]/, /\"[^#]/)), '"#')),
      ),

    boolean: ($) => choice("true", "false"),

    //
    // SET DECLARATIONS
    //
    set_decl: ($) => seq("let", "set", $.identifier, "=", $.set_list),
    set_list: ($) => seq("(", sep1($.identifier, ","), ")"),

    //
    // ROOM DEFINITIONS
    //
    room_def: ($) =>
      seq("room", field("id", alias($.identifier, $.room_id)), $.room_block),

    room_block: ($) => seq("{", repeat($.room_stmt), "}"),

    room_stmt: ($) =>
      choice(
        $.room_name,
        $.room_desc,
        $.room_visited,
        $.room_exit,
        $.overlay_stmt,
      ),

    room_name: ($) => seq("name", field("name", alias($.string, $.room_name))),

    room_desc: ($) =>
      seq(
        choice("desc", "description"),
        field("desc", alias($.string, $.room_desc)),
      ),

    room_visited: ($) =>
      seq("visited", field("visited", alias($.boolean, $.room_visited))),

    // ----------------- room exits ----------------
    room_exit: ($) =>
      seq(
        "exit",
        field("dir", alias(choice($.identifier, $.string), $.exit_dir)),
        "->",
        field("dest", alias($.identifier, $.exit_dest)),
        optional($.exit_block),
      ),

    exit_block: ($) => seq("{", repeat($.exit_stmt), "}"),
    exit_stmt: ($) =>
      choice($.required_items_stmt, $.required_flags_stmt, $.barred_stmt),
    required_items_stmt: ($) =>
      seq(
        "required_items",
        "(",
        sep1(field("item_id", $.identifier), ","),
        ")",
      ),
    required_flags_stmt: ($) =>
      seq(
        "required_flags",
        "(",
        sep1(field("flag_id", $.identifier), ","),
        ")",
      ),
    barred_stmt: ($) =>
      seq("barred", field("msg", alias($.string, $.barred_msg))),

    // --------------------- room overlays ---------------------
    overlay_stmt: ($) => seq("overlay", "if", $.ovl_cond_list, $.ovl_block),

    ovl_block: ($) => seq("{", $.ovl_text_stmt, "}"),

    ovl_text_stmt: ($) =>
      seq("text", field("text", alias($.string, $.ovl_text))),

    ovl_cond_list: ($) =>
      choice($.ovl_cond, seq("(", sep1($.ovl_cond, ","), ")")),

    ovl_cond: ($) => choice($.ovl_flag_status, $.ovl_item_presence),

    ovl_flag_status: ($) =>
      seq(
        "flag",
        choice("set", "unset", "complete"),
        field("flag_name", $.identifier),
      ),

    ovl_item_presence: ($) =>
      seq("item", choice("present", "absent"), field("item_id", $.identifier)),

    //
    // ITEM DEFINITIONS
    //
    item_def: ($) =>
      seq("item", field("id", alias($.identifier, $.item_id)), $.item_block),
    item_block: ($) => seq("{", repeat($.item_stmt), "}"),
    item_stmt: ($) => $.identifier,

    //
    // NPC DEFINITIONS
    //
    npc_def: ($) =>
      seq("npc", field("id", alias($.identifier, $.npc_id)), $.npc_block),
    npc_block: ($) => seq("{", repeat($.npc_stmt), "}"),
    npc_stmt: ($) => $.identifier,

    //
    // TRIGGER DEFINITIONS
    //
    trigger_def: ($) =>
      seq(
        "trigger",
        field("name", alias($.string, $.trigger_name)),
        $.trigger_block,
      ),
    trigger_block: ($) => seq("{", repeat($.trigger_stmt), "}"),
    trigger_stmt: ($) => $.identifier,

    //
    // SPINNER DEFINITIONS
    //
    spinner_def: ($) =>
      seq(
        "spinner",
        field("name", alias($.string, $.spinner_name)),
        $.spinner_block,
      ),
    spinner_block: ($) => seq("{", repeat($.spinner_stmt), "}"),
    spinner_stmt: ($) => $.identifier,

    //
    // GOAL DEFINITIONS
    //
    goal_def: ($) =>
      seq("goal", field("id", alias($.identifier, $.goal_id)), $.goal_block),
    goal_block: ($) => seq("{", repeat($.goal_stmt), "}"),
    goal_stmt: ($) => $.identifier,
  },
});

function sep1(rule, delimiter) {
  return seq(rule, repeat(seq(delimiter, rule)));
}
