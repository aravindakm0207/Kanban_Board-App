const Section = require('./app/models/section-model');

const initializeDefaultSections = async () => {
  const defaultSections = ['Todo', 'In Progress', 'Done'];

  for (const title of defaultSections) {
    const existingSection = await Section.findOne({ title });
    if (!existingSection) {
      const section = new Section({ title });
      await section.save();
      console.log(`Created default section: ${title}`);
    } else {
      console.log(`Section "${title}" already exists. Skipping creation.`);
    }
  }
};

module.exports = initializeDefaultSections;
