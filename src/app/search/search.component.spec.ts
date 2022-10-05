import { render, screen, waitFor } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import { MaterialModule } from '../material.module';
import { SearchComponent } from './search.component';
import { of } from 'rxjs';

describe('SearchComponent', () => {
  const imports = [MaterialModule];
  const changeQuery = jest.fn();

  beforeEach(() => {
    changeQuery.mockReset();
  });

  it('should change input value', async () => {
    await render(SearchComponent, {
      imports,
      componentProperties: {
        queryChange: { emit: changeQuery } as any,
      },
    });

    const input = screen.getByRole('textbox');

    userEvent.type(input, 'cats');
    await waitFor(() => expect(input).toHaveValue('cats'));

    userEvent.type(input, ' and');
    await waitFor(() => expect(input).toHaveValue('cats and'));

    userEvent.type(input, ' dogs');
    await waitFor(() => expect(input).toHaveValue('cats and dogs'));
  });

  it('should emit input value change', async () => {
    await render(SearchComponent, {
      imports,
      componentProperties: {
        queryChange: { emit: changeQuery } as any,
      },
    });

    const input = screen.getByRole('textbox');

    userEvent.type(input, 'cats');
    await waitFor(() => expect(input).toHaveValue('cats'));
    userEvent.type(input, ' and');
    await waitFor(() => expect(input).toHaveValue('cats and'));
    userEvent.type(input, ' dogs');
    await waitFor(() => expect(input).toHaveValue('cats and dogs'));

    await waitFor(() => expect(changeQuery).toHaveBeenCalledTimes(1));
    expect(changeQuery).toHaveBeenCalledWith('cats and dogs');
  });
});
