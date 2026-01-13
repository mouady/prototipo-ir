import Diagram from "../models/diagram.model.js";

const findAll = async () => {
  return await Diagram.find();
};

const findByDiagramId = async (diagramId) => {
  return await Diagram.findOne({ diagramId });
};

const create = async (diagramData) => {
  const diagram = new Diagram(diagramData);
  return await diagram.save();
};

export default {
  findAll,
  create,
  findByDiagramId,
};
