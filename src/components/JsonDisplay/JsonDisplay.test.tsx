import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

import JsonDisplay from './JsonDisplay';

const rawRowFixture =
  '{"_time":1722523685074,"cid":"api","channel":"conf:policies","level":"info","message":"loading policy","context":"cribl","policy":{"args":["groupName","dashboardId"],"template":["GET /m/${groupName}/search/dashboards/${dashboardId}","GET /m/${groupName}/search/dashboards/${dashboardId}/*"],"description":"Can view and use the dashboard","title":"Read Only"}}';

test('snapshot test', async () => {
  render(<JsonDisplay str={rawRowFixture} />);
  expect(screen.getByTestId('json-display')).toMatchSnapshot();
});
