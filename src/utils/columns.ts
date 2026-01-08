import type { ColumnDef } from '@tanstack/react-table';
import type { PlayerSeasonWithPoints, PositionFilter } from '../types';

// Base columns shown for all positions
const baseColumns: ColumnDef<PlayerSeasonWithPoints>[] = [
  {
    accessorKey: 'year',
    header: 'Year',
    size: 60,
  },
  {
    accessorKey: 'player',
    header: 'Player',
    size: 150,
  },
  {
    accessorKey: 'team',
    header: 'Team',
    size: 60,
  },
  {
    accessorKey: 'fantasyPoints',
    header: 'Fantasy Pts',
    size: 100,
    cell: ({ getValue }) => getValue<number>().toFixed(1),
  },
  {
    accessorKey: 'games',
    header: 'G',
    size: 40,
  },
];

// Passing columns
const passingColumns: ColumnDef<PlayerSeasonWithPoints>[] = [
  { accessorKey: 'passCmp', header: 'Cmp', size: 50 },
  { accessorKey: 'passAtt', header: 'Att', size: 50 },
  { accessorKey: 'passYds', header: 'Pass Yds', size: 80 },
  { accessorKey: 'passTD', header: 'Pass TD', size: 65 },
  { accessorKey: 'passInt', header: 'Int', size: 40 },
];

// Rushing columns
const rushingColumns: ColumnDef<PlayerSeasonWithPoints>[] = [
  { accessorKey: 'rushAtt', header: 'Rush Att', size: 70 },
  { accessorKey: 'rushYds', header: 'Rush Yds', size: 80 },
  { accessorKey: 'rushTD', header: 'Rush TD', size: 65 },
];

// Receiving columns
const receivingColumns: ColumnDef<PlayerSeasonWithPoints>[] = [
  { accessorKey: 'recTgt', header: 'Tgt', size: 50 },
  { accessorKey: 'rec', header: 'Rec', size: 50 },
  { accessorKey: 'recYds', header: 'Rec Yds', size: 80 },
  { accessorKey: 'recTD', header: 'Rec TD', size: 65 },
];

// Fumble columns
const fumbleColumns: ColumnDef<PlayerSeasonWithPoints>[] = [
  { accessorKey: 'fmbLost', header: 'Fum Lost', size: 70 },
];

export function getColumnsForPosition(
  position: PositionFilter
): ColumnDef<PlayerSeasonWithPoints>[] {
  switch (position) {
    case 'QB':
      return [
        ...baseColumns,
        ...passingColumns,
        ...rushingColumns,
        ...fumbleColumns,
      ];
    case 'RB':
      return [
        ...baseColumns,
        ...rushingColumns,
        ...receivingColumns,
        ...fumbleColumns,
      ];
    case 'WR':
    case 'TE':
      return [
        ...baseColumns,
        ...receivingColumns,
        ...rushingColumns,
        ...fumbleColumns,
      ];
    case 'All':
    default:
      return [
        ...baseColumns,
        ...passingColumns,
        ...rushingColumns,
        ...receivingColumns,
        ...fumbleColumns,
      ];
  }
}
