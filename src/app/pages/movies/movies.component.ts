import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../models/movie';
import { MovieComponent } from '../../components/movie/movie.component';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [AsyncPipe, InfiniteScrollModule, MovieComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent implements OnInit {
  private moviesService = inject(MoviesService);
  private destroyRef = inject(DestroyRef);

  public pageNumber = 1;
  public moviesObs$ = this.moviesService.fetchMoviesByType(
    'popular',
    this.pageNumber
  );
  public moviesResults: Movie[] = [];

  ngOnInit() {
    this.moviesObs$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.moviesResults = data.results;
      });
  }

  onScroll(): void {
    this.pageNumber++;
    this.moviesObs$ = this.moviesService.fetchMoviesByType(
      'popular',
      this.pageNumber
    );

    this.moviesObs$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.moviesResults = this.moviesResults.concat(data.results);
      });
  }
}
