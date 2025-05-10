import { RuleVisitors, messageIds } from './extra';
import { AST_NODE_TYPES } from '@typescript-eslint/utils';



const tt = AST_NODE_TYPES;

const MARGIN = 3;

export const ruleVisitors: RuleVisitors = (context) => {
    return {
        [tt.Program]: (node) => {
            // we assume that if there is imports then they are
            // at the top of program (there is no code before or
            // between imports).

            const { body, comments } = node;

            const firstNonImportNode = body.find((v) => {
                return v.type !== AST_NODE_TYPES.ImportDeclaration;
            });

            // seems like there is no code, bail out.
            if (!firstNonImportNode) return;

            const lastImport = body.findLast((v) => {
                return v.type === AST_NODE_TYPES.ImportDeclaration;
            });

            // last import or start of program
            const lineStart = lastImport ? lastImport.loc.end.line : 0;
            const rangeStart = lastImport ? lastImport.range[1] : 0;

            // first comment below or at starting line
            const firstComment = comments?.find((v) => {
                return v.loc.start.line >= lineStart;
            });

            // first code or comment
            const lineEnd = Math.min(
                firstComment?.loc.start.line ?? Number.MAX_SAFE_INTEGER,
                firstNonImportNode.loc.start.line,
            );
            const rangeEnd = Math.max(
                0,
                Math.min(
                    firstComment?.range[0] ?? Number.MAX_SAFE_INTEGER,
                    firstNonImportNode.range[0],
                ),
            );

            const diff = (lineEnd - 1) - lineStart;

            // margin is correct, bail out.
            if (diff === MARGIN) return;

            const isBig = diff > MARGIN;
            const errorId = (
                isBig
                    ? messageIds.bigMargin
                    : messageIds.smallMargin
            );

            context.report({
                messageId: errorId,
                node: lastImport ?? node,
                fix: (fixer) => {
                    const marginLines = '\n'.repeat(
                        // if we have to add line breaks from line zero
                        // then we need specified break count.
                        // if we add line breaks at the end of imports
                        // we have to add specified amount plus one
                        // to jump from previous line and add new lines.
                        MARGIN + (lineStart ? 1 : 0),
                    );

                    return fixer.replaceTextRange(
                        [rangeStart, rangeEnd],
                        marginLines,
                    );
                },
            });
        },
    };
};