import { render, screen } from '@testing-library/angular';
import { createMock } from '@testing-library/angular/jest-utils';
import { of } from 'rxjs';

import { AppComponent } from './app.component';
import { GifsListComponent } from './gifs-list/gifs-list.component';
import { GiphyService } from './giphy.service';
import { MaterialModule } from './material.module';
import { PaginationComponent } from './pagination/pagination.component';
import { SearchComponent } from './search/search.component';

describe('AppComponent', () => {
  const giphyServiceMock = createMock(GiphyService);
  const giphyServiceProvider = {
    provide: GiphyService,
    useValue: giphyServiceMock,
  };

  const imports = [MaterialModule];
  const declarations = [
    SearchComponent,
    GifsListComponent,
    PaginationComponent,
  ];

  const createGifStub = (id: number) => ({
    images: { original: { url: `/image${id}` } },
  });

  beforeEach(async () => {});

  it('should create the app', async () => {
    const { fixture } = await render(AppComponent, {
      imports,
      declarations,
      componentProviders: [giphyServiceProvider],
    });

    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render empty message when no gifs loaded', async () => {
    giphyServiceMock.getGifs.mockReturnValue(
      of({ data: [], pagination: { total_count: 0 } })
    );

    await render(AppComponent, {
      imports,
      declarations,
      componentProviders: [giphyServiceProvider],
    });

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.queryByRole('image')).not.toBeInTheDocument();
  });

  it('should render loaded gifs', async () => {
    giphyServiceMock.getGifs.mockReturnValue(
      of({
        data: [createGifStub(1), createGifStub(2), createGifStub(3)],
        pagination: { total_count: 3 },
      })
    );

    await render(AppComponent, {
      imports,
      declarations,
      componentProviders: [giphyServiceProvider],
    });

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.getAllByRole('img')).toHaveLength(3);
  });
});
