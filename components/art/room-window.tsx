import { roomImagePaths } from '../../content/rooms';
import { asset } from '../../lib/paths';

/** Intrinsic size of every generated room illustration (768×954 webp). */
export const ROOM_IMAGE_WIDTH = 768;
export const ROOM_IMAGE_HEIGHT = 954;

/**
 * Painted window vignette for a room (Home and /rooms/), matching the hero illustration.
 * Crossfades between morning (light) and lamplit dusk (dark) versions, and
 * lifts gently when its `.casement-trigger` parent is hovered or focused.
 * Decorative: the surrounding link or heading already names the room.
 */
export function RoomWindow({ roomId, className = '' }: { roomId: string; className?: string }) {
  const { light, dark } = roomImagePaths(roomId);
  return (
    <div className={`room-window relative isolate overflow-hidden ${className}`}>
      <img
        src={asset(light)}
        alt=""
        width={ROOM_IMAGE_WIDTH}
        height={ROOM_IMAGE_HEIGHT}
        loading="lazy"
        decoding="async"
        className="block h-auto w-full select-none"
      />
      <img
        src={asset(dark)}
        alt=""
        width={ROOM_IMAGE_WIDTH}
        height={ROOM_IMAGE_HEIGHT}
        loading="lazy"
        decoding="async"
        className="hero-img-dark pointer-events-none absolute inset-0 block h-full w-full select-none object-cover"
      />
    </div>
  );
}
