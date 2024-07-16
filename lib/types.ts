type Nullable<T> = T | null;

type Maybe<T> = T | undefined;

type MovieShort = {
  id: string;
  title: string;
  posterUrl?: string;
};
