const mongoose =require("mongoose")

const EventSchema =mongoose.Schema({
    start: Date,
    end:Date,
    person:String
})

constEvent=mongoose.model("Event", EventSchema)
module.exports= Event;