import * as React from 'react';
import type { ColumnType, StickyOffsets } from '../interface';
declare type FlattenColumns<RecordType> = readonly (ColumnType<RecordType> & {
    scrollbar?: boolean;
})[];
export declare const SummaryContext: React.Context<{
    stickyOffsets?: StickyOffsets;
    scrollColumnIndex?: number;
    flattenColumns?: FlattenColumns<any>;
}>;
export interface SummaryProps {
    fixed?: boolean | 'top' | 'bottom';
    children?: React.ReactNode;
}
/**
 * Syntactic sugar. Do not support HOC.
 */
declare function Summary({ children }: SummaryProps): React.ReactElement<any, string | React.JSXElementConstructor<any>>;
declare namespace Summary {
    var Row: typeof import("./Row").default;
    var Cell: typeof import("./Cell").default;
}
export default Summary;
