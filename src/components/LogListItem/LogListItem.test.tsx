import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

import LogListItem from './LogListItem';

const rawTimeFixture = '1725038130163';
const rawRowFixture =
  '{"_time":1722523685074,"cid":"api","channel":"conf:policies","level":"info","message":"loading policy","context":"cribl","policy":{"args":["groupName","dashboardId"],"template":["GET /m/${groupName}/search/dashboards/${dashboardId}","GET /m/${groupName}/search/dashboards/${dashboardId}/*"],"description":"Can view and use the dashboard","title":"Read Only"}}';

test('snapshot test closed', async () => {
  render(<LogListItem rawTime={rawTimeFixture} rawRow={rawRowFixture} />);
  expect(screen.getByTestId('log-list-item')).toMatchSnapshot();
});

//we trust that the browser can toggle Details open and closed and handle clicks on Summary, but we want snapshots to prove the child is rendering conditionally
test('snapshot test open', async () => {
  render(
    <LogListItem rawTime={rawTimeFixture} rawRow={rawRowFixture} open={true} />
  );
  expect(screen.getByTestId('json-display')).toBeDefined();
});
