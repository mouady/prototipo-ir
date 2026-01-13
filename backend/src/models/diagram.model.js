import mongoose from 'mongoose';

const diagramSchema = new mongoose.Schema({
  diagramId: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  diagramName: {
    type: String,
    required: true,
  },
  classes: {
    type: [Object],
    required: true,
  },
  relationships: {
    type: [Object],
    required: true,
  },
  metadata: {
    type: Object,
  },
});

const Diagram = mongoose.model('Diagram', diagramSchema);

export default Diagram;
