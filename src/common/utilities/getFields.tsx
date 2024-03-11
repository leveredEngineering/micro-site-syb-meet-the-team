import generatorData from '../../generator.json'

export const getFields = () => {
  const fields = [
    "id",
    "uid",
    "meta",
    "name",
    // "geomodifier",
    // "address",
    // "mainPhone",
    // "description",
    // "hours",
    // "photoGallery",
    // "slug",
  ];
  if (generatorData?.customFields.length > 0) {
    return fields.concat(generatorData.customFields);
  }

  return fields;
}