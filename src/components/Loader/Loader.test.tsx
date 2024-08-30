import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

import Loader from './Loader';

test('snapshot test', async () => {
  render(<Loader loaded={50} total={100} />);
  expect(screen.getByTestId('loader')).toMatchSnapshot();
});
