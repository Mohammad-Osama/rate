import mongoose from "mongoose";

export interface IMovie{
    title:string;
    tmdb_id:number;
 //   rating_total :number;
    rating_count : number;
    acting:number;
    story:number;
    dialogue:number;
    cinematography :number;
    visual_effects:number;
    sound_effects:number;
    directing:number

}
 const MovieSchema = new mongoose.Schema<IMovie>({ 
    title: { type: String, required: [true, "Please add a title"]  },
    tmdb_id: { type: Number, required: [true, "Please add tmdb_id"]  },
  //  rating_total: { type: Number, required: [true, "Please add rating_total"]  },
    rating_count: { type: Number, required: [true, "Please add rating_count"]  },
    acting: { type: Number, required: [true, "Please add acting"] ,max:10 },
    story: { type: Number, required: [true, "Please add story"] ,max:10 },
    dialogue: { type: Number, required: [true, "Please add dialogue"] ,max:10 },
    cinematography: { type: Number, required: [true, "Please add cinematography"] ,max:10 },
    visual_effects: { type: Number, required: [true, "Please add visual_effects"],max:10  },
    sound_effects: { type: Number, required: [true, "Please add sound_effects"] ,max:10 },
    directing: { type: Number, required: [true, "Please add directing"] ,max:10 },
    


  } ,
  {
      timestamps : true
  });
  /* MovieSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
    }
  }) */

  export const Movie = mongoose.models.Movie || mongoose.model<IMovie>('Movie', MovieSchema);