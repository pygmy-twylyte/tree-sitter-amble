package tree_sitter_amble_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_amble "github.com/pygmy-twylyte/tree-sitter-amble.git/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_amble.Language())
	if language == nil {
		t.Errorf("Error loading Amble grammar")
	}
}
