import { test, expect } from '@playwright/test';

test.describe('Fantasy MVP App', () => {
  test('scoring modal saves and persists changes', async ({ page }) => {
    await page.goto('/');

    // Wait for data to load
    await expect(page.getByText('Loading data...')).toBeHidden({ timeout: 10000 });

    // Open scoring settings
    await page.getByRole('button', { name: 'Scoring Settings' }).click();
    await expect(page.getByRole('heading', { name: 'Scoring Settings' })).toBeVisible();

    // Get the PPR input by finding the label and its adjacent input
    const pprLabel = page.getByText('Points per Reception');
    const pprInput = pprLabel.locator('..').locator('input');

    // Verify initial value is 0 (standard scoring)
    await expect(pprInput).toHaveValue('0');

    // Change PPR to 1 (full PPR)
    await pprInput.fill('1');
    await expect(pprInput).toHaveValue('1');

    // Save changes
    await page.getByRole('button', { name: 'Save Changes' }).click();

    // Modal should close
    await expect(page.getByRole('heading', { name: 'Scoring Settings' })).toBeHidden();

    // Reopen modal and verify the value persisted
    await page.getByRole('button', { name: 'Scoring Settings' }).click();
    await expect(page.getByRole('heading', { name: 'Scoring Settings' })).toBeVisible();

    // Verify PPR is still 1 (this is the bug - it resets to 0)
    const pprInputAgain = pprLabel.locator('..').locator('input');
    await expect(pprInputAgain).toHaveValue('1');

    // Close modal
    await page.getByRole('button', { name: 'Cancel' }).click();
  });

  test('loads and displays player data', async ({ page }) => {
    await page.goto('/');

    // Check header is present
    await expect(page.locator('h1')).toContainText('Fantasy MVP');

    // Wait for data to load (loading indicator should disappear)
    await expect(page.getByText('Loading data...')).toBeHidden({ timeout: 10000 });

    // Check that the table is present with data
    const table = page.locator('table');
    await expect(table).toBeVisible();

    // Check that we have rows in the table
    const rows = page.locator('tbody tr');
    await expect(rows.first()).toBeVisible();

    // Check that fantasy points column exists
    await expect(page.getByRole('columnheader', { name: 'Fantasy Pts' })).toBeVisible();

    // Check that position dropdown is present
    await expect(page.locator('select').first()).toBeVisible();

    // Check that scoring settings button is present
    await expect(page.getByRole('button', { name: 'Scoring Settings' })).toBeVisible();

    // Click on scoring settings and verify modal opens
    await page.getByRole('button', { name: 'Scoring Settings' }).click();
    await expect(page.getByRole('heading', { name: 'Scoring Settings' })).toBeVisible();

    // Close modal
    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(page.getByRole('heading', { name: 'Scoring Settings' })).toBeHidden();

    // Filter by position (QB)
    await page.locator('select').first().selectOption('QB');

    // Verify table still has data and shows QB-specific columns
    await expect(page.getByRole('columnheader', { name: 'Pass Yds' })).toBeVisible();
  });
});
