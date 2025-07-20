'use client';

import { LetterBox } from "./LetterBox";
import { Row } from "@/core/Row";

export type RowBoxProps = {
  row: Row;
  index: number;
}

export function RowBox(props: RowBoxProps) {
  return <div className="flex gap-1.5">
    { props.row.letters.map((letter, index) => <LetterBox index={index} rowIndex={props.index} key={index} letter={letter} />) }
  </div>;
}