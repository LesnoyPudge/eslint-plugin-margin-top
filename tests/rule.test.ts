import { RuleTester } from '@typescript-eslint/rule-tester';
import { rule } from 'src/rule';
import { messageIds, ruleName } from 'src/extra';
import * as test from 'node:test';



RuleTester.afterAll = test.after;
RuleTester.describe = test.describe;
RuleTester.it = test.it;
RuleTester.itOnly = test.it.only;

const ruleTester = new RuleTester();

const padded = (text: string) => ' '.repeat(4) + text;

const nonImportCode = 'const some = 1;';

const comment = '// some comment';

const withValidSpaces = (text: string) => {
    return [
        text,
        '',
        '',
        '',
        nonImportCode,
    ].join('\n');
};

const withValidComments = (text: string) => {
    return [
        text,
        '',
        '',
        '',
        comment,
        '',
        nonImportCode,
    ].join('\n');
};

const withInvalidSpacesBig = (text: string) => {
    return [
        text,
        '',
        '',
        '',
        '',
        nonImportCode,
    ].join('\n');
};

const withInvalidSpacesSmall = (text: string) => {
    return [
        text,
        '',
        '',
        nonImportCode,
    ].join('\n');
};

const withInvalidCommentsBig = (text: string) => {
    return [
        text,
        '',
        '',
        '',
        '',
        comment,
        '',
        nonImportCode,
    ].join('\n');
};

const withInvalidCommentsSmall = (text: string) => {
    return [
        text,
        '',
        '',
        comment,
        '',
        nonImportCode,
    ].join('\n');
};

const validWithoutImports = () => {
    return [
        '',
        '',
        '',
        nonImportCode,
    ].join('\n');
};

const invalidWithoutImportsBig = () => {
    return [
        '',
        '',
        '',
        '',
        nonImportCode,
    ].join('\n');
};

const invalidWithoutImportsSmall = () => {
    return [
        '',
        '',
        nonImportCode,
    ].join('\n');
};

const importLine = `import { some } from 'module';`;

const importMultiline = [
    'import {',
    padded(`some,`),
    '} from \'module\';',
].join('\n');

ruleTester.run(ruleName, rule, {
    valid: [
        importLine,

        withValidSpaces(importLine),

        withValidSpaces(importMultiline),

        withValidComments(importLine),

        withValidComments(importMultiline),

        validWithoutImports(),
    ],
    invalid: [
        {
            code: invalidWithoutImportsBig(),

            output: validWithoutImports(),

            errors: [{
                messageId: messageIds.bigMargin,
            }],
        },

        {
            code: invalidWithoutImportsSmall(),

            output: validWithoutImports(),

            errors: [{
                messageId: messageIds.smallMargin,
            }],
        },

        {
            code: withInvalidSpacesBig(importLine),

            output: withValidSpaces(importLine),

            errors: [{
                messageId: messageIds.bigMargin,
            }],
        },

        {
            code: withInvalidSpacesSmall(importLine),

            output: withValidSpaces(importLine),

            errors: [{
                messageId: messageIds.smallMargin,
            }],
        },

        {
            code: withInvalidSpacesBig(importMultiline),

            output: withValidSpaces(importMultiline),

            errors: [{
                messageId: messageIds.bigMargin,
            }],
        },

        {
            code: withInvalidSpacesSmall(importMultiline),

            output: withValidSpaces(importMultiline),

            errors: [{
                messageId: messageIds.smallMargin,
            }],
        },

        {
            code: withInvalidCommentsSmall(importLine),

            output: withValidComments(importLine),

            errors: [{
                messageId: messageIds.smallMargin,
            }],
        },

        {
            code: withInvalidCommentsBig(importLine),

            output: withValidComments(importLine),

            errors: [{
                messageId: messageIds.bigMargin,
            }],
        },

        {
            code: withInvalidCommentsSmall(importMultiline),

            output: withValidComments(importMultiline),

            errors: [{
                messageId: messageIds.smallMargin,
            }],
        },

        {
            code: withInvalidCommentsBig(importMultiline),

            output: withValidComments(importMultiline),

            errors: [{
                messageId: messageIds.bigMargin,
            }],
        },
    ],
});