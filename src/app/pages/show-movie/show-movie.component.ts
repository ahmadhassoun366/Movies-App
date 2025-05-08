import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../models/movie';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-show-movie',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './show-movie.component.html',
  styleUrl: './show-movie.component.css',
})
export class ShowMovieComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private movieService = inject(MoviesService);

  movieId!: string;
  movie$!: Observable<Movie>;

  ngOnInit() {
    this.movieId = this.route.snapshot.paramMap.get('movieId') || '';
    this.movie$ = this.movieService.fetchMovieById(this.movieId);
  }
}
