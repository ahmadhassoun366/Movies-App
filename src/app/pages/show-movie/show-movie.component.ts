import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MoviesService, imagesBaseUrl } from '../../services/movies.service';
import { Movie } from '../../models/movie';
import { Video } from '../../models/video';
import { Actor } from '../../models/credit';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-show-movie',
  standalone: true,
  imports: [CommonModule, AsyncPipe, RouterModule],
  templateUrl: './show-movie.component.html',
  styleUrl: './show-movie.component.css',
})
export class ShowMovieComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private movieService = inject(MoviesService);
  private sanitizer = inject(DomSanitizer);

  movieId!: string;

  movie$!: Observable<Movie>;
  videos$!: Observable<Video[]>;
  cast$!: Observable<Actor[]>;
  similarMovies$!: Observable<Movie[]>;

  imagesBaseUrl = imagesBaseUrl;
  sanitizedVideoUrl?: SafeResourceUrl;

  ngOnInit(): void {
    this.movieId = this.route.snapshot.paramMap.get('movieId') || '';

    this.movie$ = this.movieService.fetchMovieById(this.movieId);
    this.videos$ = this.movieService.fetchMovieVideos(this.movieId);
    this.cast$ = this.movieService.fetchMovieCast(this.movieId);
    this.similarMovies$ = this.movieService.fetchSimilarMovies(this.movieId);

    this.videos$.subscribe((videos) => {
      const trailer = videos.find((v) => v.site === 'YouTube');
      if (trailer) {
        this.sanitizedVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          'https://www.youtube.com/embed/' + trailer.key
        );
      }
    });
  }
}
