import { render, screen, waitFor } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import { MaterialModule } from '../material.module';
import { PaginationComponent } from './pagination.component';
import { of } from 'rxjs';

describe('PaginationComponent', () => {
  const imports = [MaterialModule];
  const changePage = jest.fn();

  beforeEach(() => {
    changePage.mockReset();
  });

  it('should emit page change', async () => {
    await render(PaginationComponent, {
      imports,
      componentProperties: {
        pageSize: 3,
        totalCount: of(9),
        pageChange: { emit: changePage } as any,
      },
    });

    userEvent.click(screen.getByLabelText(/next page/i));

    await waitFor(() => expect(changePage).toHaveBeenCalled());
  });
});
