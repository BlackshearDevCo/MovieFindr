import { gql } from "@apollo/client";

export const MOVIES_PREVIEW_QUERY = gql`
  query MOVIES_PREVIEW_QUERY(
    $search: String
    $genre: String
    $perPage: Int
    $page: Int
  ) {
    movies(
      where: { search: $search, genre: $genre }
      pagination: { perPage: $perPage, page: $page }
    ) {
      nodes {
        id
        title
        posterUrl
        genres {
          title
          id
        }
      }
      pagination {
        perPage
        totalPages
        page
      }
    }
  }
`;

export const MOVIE_QUERY = gql`
  query MOVIE_QUERY($movieId: ID!) {
    movie(id: $movieId) {
      writers
      worstRating
      title
      summary
      ratingValue
      rating
      posterUrl
      mainActors
      id
      genres {
        title
        id
      }
      duration
      directors
      datePublished
      bestRating
    }
  }
`;

export const GENRE_LIST_QUERY = gql`
  query GENRE_LIST_QUERY {
    genres {
      nodes {
        id
        title
      }
    }
  }
`;

export const GENRES_QUERY = gql`
  query GENRES_QUERY {
    genres {
      nodes {
        id
        title
        movies {
          id
          title
          posterUrl
        }
      }
      pagination {
        page
        totalPages
      }
    }
  }
`;

export const GENRE_QUERY = gql`
  query Genre($genreId: ID!) {
    genre(id: $genreId) {
      id
      title
      movies {
        id
        title
        posterUrl
      }
    }
  }
`;
