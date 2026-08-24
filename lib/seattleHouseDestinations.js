const SEATTLE_HOUSE_DESTINATIONS = Object.freeze({
  "seattle-house-north-tower": Object.freeze({
    key: "seattle-house-north-tower",
    label: "North Tower",
    address: "2300 6th Avenue, Seattle, WA 98121",
    zip: "98121",
    sourceLabel: "partner-seattle-house-north-tower",
    tags: ["SEATTLE_HOUSE_LEAD", "SEATTLE_HOUSE_NORTH_TOWER"],
  }),
  "seattle-house-south-tower": Object.freeze({
    key: "seattle-house-south-tower",
    label: "South Tower",
    address: "2350 6th Avenue, Seattle, WA 98121",
    zip: "98121",
    sourceLabel: "partner-seattle-house-south-tower",
    tags: ["SEATTLE_HOUSE_LEAD", "SEATTLE_HOUSE_SOUTH_TOWER"],
  }),
});

const SEATTLE_HOUSE_MOVE_TYPES = Object.freeze([
  Object.freeze({ value: "move", label: "Move" }),
  Object.freeze({ value: "pack-and-move", label: "Pack and Move" }),
]);

const SEATTLE_HOUSE_MOVE_SIZES = Object.freeze([
  "Studio",
  "1 Bedroom",
  "2 Bedrooms",
]);

function isSeattleHouseDestinationRequest(destinationKey) {
  return typeof destinationKey === "string" && destinationKey.startsWith("seattle-house-");
}

function applySeattleHouseDestination(lead) {
  const destination = SEATTLE_HOUSE_DESTINATIONS[lead.partnerDestination];
  if (!destination) return null;

  return {
    ...lead,
    toZip: destination.zip,
    toAddress: destination.address,
    partnerTowerName: destination.label,
    sourceLabel: destination.sourceLabel,
    supermoveTags: destination.tags,
  };
}

function isValidSeattleHouseMoveSelection(moveType, moveSize) {
  return SEATTLE_HOUSE_MOVE_TYPES.some((option) => option.value === moveType)
    && SEATTLE_HOUSE_MOVE_SIZES.includes(moveSize);
}

function getSeattleHouseMoveTypeLabel(moveType) {
  return SEATTLE_HOUSE_MOVE_TYPES.find((option) => option.value === moveType)?.label || "Move";
}

module.exports = {
  SEATTLE_HOUSE_DESTINATIONS,
  SEATTLE_HOUSE_MOVE_TYPES,
  SEATTLE_HOUSE_MOVE_SIZES,
  applySeattleHouseDestination,
  isSeattleHouseDestinationRequest,
  isValidSeattleHouseMoveSelection,
  getSeattleHouseMoveTypeLabel,
};
