import XCTest
import SwiftTreeSitter
import TreeSitterAmble

final class TreeSitterAmbleTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_amble())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Amble grammar")
    }
}
