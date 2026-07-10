type RoomMemberCountSource = {
  memberCount?: number | null;
  members?: { isActive?: boolean }[];
};

export const getRoomMemberCount = (room?: RoomMemberCountSource | null) => {
  const actualMemberCount = (room?.members || []).length;
  const configuredMemberCount =
    room?.memberCount != null && Number.isFinite(Number(room.memberCount))
      ? Math.max(Number(room.memberCount), 0)
      : 0;

  return Math.max(actualMemberCount, configuredMemberCount);
};
