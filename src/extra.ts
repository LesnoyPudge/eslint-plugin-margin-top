import { ESLintUtils, TSESLint } from '@typescript-eslint/utils';
import { name, version } from './package';



export const ruleName = 'margin-top';

export const createRule = ESLintUtils.RuleCreator(() => {
    return `https://github.com/LesnoyPudge/eslint-plugin-${ruleName}`;
});

export const pluginName = name;

export const pluginVersion = version;

export const messageIds = {
    smallMargin: 'smallMargin',
    bigMargin: 'bigMargin',
} as const;

export type MessageIds = typeof messageIds;

export const defaultOptions = [] as const;

type Options = typeof defaultOptions;

export type RuleVisitors = (
    context: Readonly<TSESLint.RuleContext<keyof MessageIds, Options>>,
    optionsWithDefault: Readonly<Options>
) => TSESLint.RuleListener;