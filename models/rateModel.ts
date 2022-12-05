import mongoose from "mongoose";

export interface IRate{
    title:string;
    tmdb_id:number;
 //   rating_total :number;
    media_type : string;
    user: mongoose.Types.ObjectId;
   // media: mongoose.Types.ObjectId;
    acting:number;
    story:number;
    dialogue:number;
    cinematography :number;
    visual_effects:number;
    sound_effects:number;
    directing:number

}
 const RateSchema = new mongoose.Schema<IRate>({ 
    title: { type: String, required: [true, "Please add a title"]  },
    tmdb_id: { type: Number, required: [true, "Please add tmdb_id"]  },
  //  rating_total: { type: Number, required: [true, "Please add rating_total"]  },
    media_type: { type: String, required: [true, "Please add a type"] ,
                  enum:["movie","tv"] 
                },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please add the user"],
      ref: "User"
      },
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

  export const Rate = mongoose.models.Rate || mongoose.model<IRate>('Rate', RateSchema);