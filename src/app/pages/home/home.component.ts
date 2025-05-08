import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../models/movie';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AsyncPipe, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private moviesService = inject(MoviesService);

  featuredMovies$ = this.moviesService.fetchMoviesByType('now_playing').pipe(
    map((res) => res.results.slice(0, 6)) // Show only 6 featured movies
  );

  ngOnInit(): void {}
}
