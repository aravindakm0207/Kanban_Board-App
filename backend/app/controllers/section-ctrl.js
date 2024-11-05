const Section = require('../models/section-model')
const sectionCtrl = {}


sectionCtrl.create = async (req, res) => {
  try {
    const section = new Section(req.body)
    await section.save()
    res.status(201).json(section)
  } catch (error) {
    res.status(500).json({ error: 'Error creating section' })
  }
};


sectionCtrl.remove = async (req, res) => {
  try {
    const { sectionId } = req.params
    const section = await Section.findByIdAndDelete(sectionId)
    if (!section) {
      return res.status(404).json({ error: 'Section not found' })
    }

    res.status(200).json({ message: 'Section deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Error deleting section' })
  }
}


sectionCtrl.update = async (req, res) => {
  try {
    const { sectionId } = req.params;
    const updatedSection = await Section.findByIdAndUpdate(sectionId, req.body, { new: true });
    if (!updatedSection) {
      return res.status(404).json({ error: 'Section not found' });
    }
    res.status(200).json(updatedSection);
  } catch (error) {
    res.status(500).json({ error: 'Error updating section' });
  }
};

sectionCtrl.single = async (req, res) => {
  try {
    const { sectionId } = req.params;
    const section = await Section.findById(sectionId).populate('tasks');

    if (!section) {
      return res.status(404).json({ error: 'Section not found' });
    }

    res.status(200).json(section);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching section' });
  }
};


sectionCtrl.list = async (req, res) => {
  try {
    const sections = await Section.find().populate('tasks');
    res.status(200).json(sections);
  } catch (error) {
    res.status(500).json({ error: 'Error listing sections' });
  }
};

module.exports = sectionCtrl;
