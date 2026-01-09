# Add Rank Column to Stats Table

## Summary

Add a ranking ordinal column (`#`) as the first column in the stats table, displaying each row's position (1, 2, 3...) based on the current sort order.

## Why This Change?

When analyzing 55 years of fantasy football data with up to 500 results, users need a clear visual indicator of each row's position. Currently, users must mentally track row numbers or count manually.

**This feature:**
- Improves UX by providing instant context ("This is the #1 fantasy season of all time")
- Enables easy comparison discussions ("Compare rows #15 and #42")
- Follows common patterns seen in sports statistics tables (ESPN, Yahoo, etc.)

## What Changed

### Files Modified

1. **`src/utils/columns.tsx`**
   - Added `rankColumn` definition using TanStack Table's row context
   - Inserted rank column at the start of all position configurations (QB, RB, WR, TE, All)
   - Uses muted gray styling (`text-gray-500`) to not compete visually with player data

2. **`src/components/StatsTable.tsx`**
   - Updated `isTextColumn` check to include `rank` for left-alignment
   - Rank column is not sticky (only player column remains sticky)

3. **`e2e/app.spec.ts`**
   - Added new E2E test verifying rank column displays correctly
   - Tests that first 3 rows show ranks 1, 2, 3

## Implementation Details

The rank uses TanStack Table's built-in `row.index` property, which automatically updates when the table is re-sorted. This means:
- Default sort (by Fantasy Pts) shows ranks 1-500
- When user clicks a different column header, ranks update to reflect new sort order
- No additional state management needed

```typescript
const rankColumn: ColumnDef<PlayerSeasonWithPoints> = {
  id: 'rank',
  header: '#',
  size: 40,
  cell: ({ row }) => (
    <span className="text-gray-500">{row.index + 1}</span>
  ),
};
```

## Testing

### Unit Tests
All 21 existing unit tests pass.

### E2E Tests  
All 3 E2E tests pass, including the new rank column test:
- `rank column displays row positions correctly` - NEW
- `scoring modal saves and persists changes` - EXISTING
- `loads and displays player data` - EXISTING

```bash
npm test        # Unit tests pass
npm run test:e2e  # All 3 E2E tests pass
```

## Screenshots

The rank column appears as the first column showing row numbers 1, 2, 3, etc.

| # | Year | Player | Team | Fantasy Pts |
|---|------|--------|------|-------------|
| 1 | 2006 | LaDainian Tomlinson | SDG | 481.1 |
| 2 | 2019 | Christian McCaffrey | CAR | 469.2 |
| 3 | ... | ... | ... | ... |

## Checklist

- [x] Code follows existing patterns in the codebase
- [x] No new dependencies added
- [x] All tests pass
- [x] Feature works across all position filters (All, QB, RB, WR, TE)
- [x] Column styling consistent with existing columns
