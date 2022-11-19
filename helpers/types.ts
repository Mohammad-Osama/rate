import { NumberLiteralType } from "typescript";

export interface IMovieOrTv {

    adult?: boolean;
    backdrop_path: string;
    genre_ids: number[],
    id: number;
    original_language: string;
    original_title?: string;
    original_name?: string;
    origin_country?: string[];
    overview: string;
    popularity: number;
    poster_path: string;
    release_date?: string;
    first_air_date?: string;
    title?: string;
    name?: string;
    video?: boolean;
    vote_average: number;
    vote_count: number;

}

export interface IGenre {
    id: number;
    name: string;
}

export interface ICollection {

    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;

}

export interface IProductionCompany {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
}

export interface IProductionCountry {
    iso_3166_1: string;
    name: string;
}

export interface ISpokenLanguage {

    english_name?: string;
    iso_639_1: string;
    name: string;
}
export type IStatus =
    "Rumored" |
    "Planned" |
    "In Production" |
    "Post Production" |
    "Released" |
    "Canceled";

export interface IMovie {

    adult?: boolean;
    backdrop_path: string | null;
    belongs_to_collection: ICollection | null;
    budget: number;
    genres: IGenre[];
    homepage: string | null;
    id: number;
    imdb_id: string | null;
    original_language: string;
    original_title: string;
    overview: string | null;
    popularity: number;
    poster_path: string | null;
    production_companies: IProductionCompany[]
    production_countries: IProductionCountry[]
    release_date: string;
    revenue: number;
    runtime: number | null;
    spoken_languages: ISpokenLanguage[];
    status: IStatus;
    tagline: string | null;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;


}