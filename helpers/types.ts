
export interface IMovieOrTv {

    adult?: boolean;
    backdrop_path: string;
    genre_ids: number[];
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
    origin_country?: string;
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
export interface ILastEpisode {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string | null;
    runtime: number,
    season_number: number;
    show_id: number;
    still_path: string | null;
    vote_average: number;
    vote_count: number;
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
    episode_run_time: number[];
    first_air_date: string;
    genres: IGenre[];
    homepage: string;
    id: number;
    in_production: boolean;
    languages: string[];
    last_air_date: string;
    last_episode_to_air: ILastEpisode;
    name: string;
    next_episode_to_air: null,
    networks: INetwork[];
    number_of_episodes: number;
    number_of_seasons: number;
    origin_country: string[];
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
    tagline: string;
    type: string;
    vote_average: number;
    vote_count: number;
}


// no need for media_type ??
// this type for both movie and tv ?!
export interface IMovieRate {
    title: string;
    tmdb_id: number;
    poster_path:string;
    tmdb_rating:number;

    rating_count: number;
    acting: number;
    story: number;
    dialogue: number;
    cinematography: number;
    visual_effects: number;
    sound_effects: number;
    directing: number
    _id: string
    media_type: string
}

// add created at and updated at ??
export interface IRate {
    title: string;
    tmdb_id: number;
    poster_path:string;
    tmdb_rating:number;
    user: string;
    media_type: string,
    acting: number;
    story: number;
    dialogue: number;
    cinematography: number;
    visual_effects: number;
    sound_effects: number;
    directing: number
    _id: string ;
    createdAt:string;
    updatedAt:string;
}

export interface ICast {
    adult: boolean,
    gender: number | null,
    id: number,
    known_for_department: string,
    name: string,
    original_name: string,
    popularity: number,
    profile_path: string | null,
    cast_id?: number,
    character: string,
    credit_id: string,
    order: number
}

export interface ICrew {
    adult: boolean,
    gender: number | null,
    id: number,
    known_for_department: string,
    name: string,
    original_name: string,
    popularity: number,
    profile_path: string | null,
    credit_id: string,
    department: string,
    job: string,
}

export interface ICastOrCrew {
    adult: boolean,
    gender: number | null,
    id: number,
    known_for_department: string,
    name: string,
    original_name: string,
    popularity: number,
    profile_path: string | null,
    cast_id?: number,
    character?: string,
    credit_id: string,
    order?: number,
    department?: string,
    job?: string,
}
export interface ICredits {
    id: number
    cast: ICastOrCrew[]
    crew: ICastOrCrew[]
    guest_stars?: ICastOrCrew[]
}

export interface IBackdropOrPoster {
    aspect_ratio: number
    file_path: string
    height: number
    iso_639_1: string | null
    vote_average: number
    vote_count: number
    width: number
}

export interface IImages {
    id: number
    backdrops: IBackdropOrPoster[]
    posters: IBackdropOrPoster[]
    stills: IBackdropOrPoster[]
    profiles: IBackdropOrPoster[]
}

export interface IVideo {
    iso_639_1: string
    iso_3166_1: string
    name: string
    key: string
    sit: string
    size: number
    type: string
    official: boolean
    published_at: string
    id: string
}

export interface IVideos {
    id: number
    results: IVideo[]
}

export interface IProviderData {
    logo_path: string
    provider_id: number
    provider_name: string
    display_priority: number
}
export interface IProvidersList {
    link: string
    flatrate: IProviderData[]
    rent: IProviderData[]
    buy: IProviderData[]
}

export interface IAllProviders {
    id: number
    results: {
        [key: string]: IProvidersList
    }
}


export interface ICollectionDetails {
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    parts: IMovieOrTv[]
}

export interface IProductionCompanyDetails {
    id: number;
    name: string;
    description: string;
    headquarters: string;
    logo_path: string | null;
    origin_country: string;
    parent_company: IProductionCompany | null;
}

export interface INetworkDetails {
    id: number;
    name: string;
    headquarters: string;
    homepage: string;
    logo_path: string | null;
    origin_country: string;
}


export interface IEpisode {
    id: number;
    name: string;
    overview: string;
    production_code: string;
    season_number: string;
    still_path: string;
    air_date: string;
    runtime: number;
    episode_number: string;
    show_id?: number;
    vote_average: number;
    vote_count: number;
    crew: ICastOrCrew[];
    guest_stars: ICastOrCrew[];
}

export interface ISeasonDetails {
    _id: string;
    air_date: string;
    id: number;
    name: string;
    overview: string;
    season_number: string;
    poster_path: string | null;
    episodes: IEpisode[]
}

/* export interface ICreditsEpisode {
    id: number
    cast: ICastOrCrew[]
    crew: ICastOrCrew[]
    
} */

export interface IPerson {
    birthday: string | null;
    known_for_department: string;
    deathday: string | null;
    id: number;
    name: string;
    also_known_as: string[];
    gender: number;
    biography: string;
    popularity: number;
    place_of_birth: string | null;
    profile_path: string | null;
    adult: boolean;
    imdb_id: string;
    homepage: string | null;
}


export interface IPersonCreditsCastorCrew {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    origin_country?: string[];
    original_language: string;
    original_name?: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    first_air_date?: string;
    name?: string;
    vote_average: number;
    vote_count: number;
    character?: string;
    credit_id: string;
    episode_count?: number;
    media_type: string;
    original_title: string;
    release_date?: string;
    title?: string;
    video?: boolean;
    order?: number;
    department?: string;
    job?: string;

}

export interface IPersonCreditsCrew {
    //  adult: boolean;
    // backdrop_path: string | null;
    //  genre_ids: number[];
    //    id: number;
    //  original_language: string;
    //   original_title: string;
    //  overview: string;
    //   popularity: number;
    //  poster_path: string | null;
    //   release_date?: string;
    //  title?: string;
    //  video?: boolean;
    //  vote_average: number;
    //  vote_count: number;
    //  credit_id: string;
    // department: string;
    //  job: string;
    //  media_type: string;
    //  origin_country?: string[];
    // original_name?: string;
    //  first_air_date?: string;
    // name?: string;
    // episode_count?: number;
}

export interface IPersonCredits {
    id: number;
    cast: IPersonCreditsCastorCrew[];
    crew: IPersonCreditsCastorCrew[];
}
export interface IPersonCreditsModified {
    id: number;
    title: string;
    poster_path: string | null;
    release_date: string;
    media_type: string;
    vote_average: number;
    credit_id: string;
    role: string;
}
export interface ISearchMulti {
    // movie 
    adult?: boolean;
    backdrop_path?: string | null;
    genre_ids: number[];
    id: number;
    media_type: string;
    original_language?: string;
    original_title?: string;
    overview?: string;
    popularity: number;
    poster_path?: string | null;
    release_date?: string;
    title?: string;
    video?: boolean,
    vote_average?: number;
    vote_count?: number;

    //person
    gender?: number;
    known_for: IPersonCreditsCastorCrew[]
    known_for_department?: string;
    name?: string;
    profile_path?: string | null;

    //tv
    first_air_date?: string;
    origin_country?: string[];
    original_name?: string;
}

export type IMediaType =
    "movie" |
    "tv" |
    "person" |
    "all";

export type ITimeWindnow =
    "day" |
    "week";


export interface IUser {
    id: string
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    birthday: string;
    phone: string;
    status: string;
    city: string;
    country: string;
    address: string;
    createdAt: string;
    updatedAt: string;
}
