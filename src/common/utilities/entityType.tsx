import { Meta } from "src/types/entities";

function isATM(meta: Meta) {
  return meta.entityType.id === "atm";
}
  
function isLocation(meta: Meta) {
  console.log('isLocation: ', meta.entityType.id === "location");
  return meta.entityType.id === "location";
}
  
export { isATM, isLocation };