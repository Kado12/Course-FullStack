import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model('Contact', contactSchema);