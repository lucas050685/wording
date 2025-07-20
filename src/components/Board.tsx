'use client';

import { Game } from "@/core/Game";
import { RowBox } from "./RowBox";

export type BoardProps = {
  game: Game;
}

export function Board(props: BoardProps) {
  return <div className="flex flex-col gap-2">
    { props.game.rows.map((row, index) => <RowBox key={index} row={row} index={index} />) }
  </div>;
}