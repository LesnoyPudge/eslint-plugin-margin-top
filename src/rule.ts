import { ESLintUtils } from '@typescript-eslint/utils';
import {
    createRule,
    defaultOptions,
    messageIds,
    MessageIds,
    ruleName,
} from './extra';
import { ruleVisitors } from './ruleVisitors';
import { toOneLine } from '@lesnoypudge/utils';



const ruleMeta: ESLintUtils.NamedCreateRuleMeta<keyof MessageIds> = {
    docs: {
        description: toOneLine(`
            Import declarations or start of program and actual code  
            should be separated by specified amount of empty lines.    
        `),
    },
    messages: {
        [messageIds.bigMargin]: 'Margin is bigger then specified.',
        [messageIds.smallMargin]: `Margin is smaller then specified.`,
    },
    type: 'layout',
    schema: [],
    fixable: 'whitespace',
};

export const rule = createRule({
    create: ruleVisitors,
    name: ruleName,
    meta: ruleMeta,
    defaultOptions,
});