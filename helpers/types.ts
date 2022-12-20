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

export interface ICreatedBy {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string | null;

}
//check runtime  , show_id
// add type for crew guest_stars, IPerson maybe ?
export interface IEpisode {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string | null;
    runtime?: any | null,
    season_number: number;
    show_id?: number;
    still_path: string | null;
    vote_average: number;
    vote_count: number;
    crew?: any;
    guest_stars?: any;

}
export interface INetwork {
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
}

export interface ISeason {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
}
// check next expisode to air 
export interface ITv {
    adult?: boolean;
    backdrop_path: string | null;
    created_by: ICreatedBy[];
    episode_run_time: [number];
    first_air_date: string;
    genres: IGenre[];
    homepage: string;
    id: number;
    in_production: boolean;
    languages: [string];
    last_air_date: string;
    last_episode_to_air: IEpisode;
    name: string;
    next_episode_to_air: null,
    networks: INetwork[];
    number_of_episodes: number;
    number_of_seasons: number;
    origin_country: [string];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    production_companies: IProductionCompany[];
    production_countries: IProductionCountry[];
    seasons: ISeason[]
    spoken_languages: ISpokenLanguage[]
    status: string;
    tagline:  string;
    type:  string;
    vote_average: number;
    vote_count: number;
}



export interface IMovieRate {
    title:string;
    tmdb_id:number;
    rating_count : number;
    acting:number;
    story:number;
    dialogue:number;
    cinematography :number;
    visual_effects:number;
    sound_effects:number;
    directing:number
    _id :string
}


export interface IRate {
    title:string;
    tmdb_id:number;
    user:string;
    media_type: string,
    acting:number;
    story:number;
    dialogue:number;
    cinematography :number;
    visual_effects:number;
    sound_effects:number;
    directing:number
    _id :string
}

export interface ICast {
    adult: boolean,
    gender: number|null,
    id: number,
    known_for_department: string,
    name: string,
    original_name: string,
    popularity: number,
    profile_path: string|null,
    cast_id: number,
    character: string,
    credit_id: string,
    order: number
}

export interface ICrew {
    adult: boolean,
    gender: number|null,
    id: number,
    known_for_department: string,
    name: string,
    original_name: string,
    popularity: number,
    profile_path: string|null,
    credit_id: string,
    department: string,
    job: string,
}