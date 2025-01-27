// Layout dimensions
export const LAYOUT_DIMENSIONS = {
  HAND_CONTAINER_WIDTH: 600, // Width of the hand container in pixels
  CONTAINER_HEIGHT: 250,
  CARD_HEIGHT: 72, // 4.5rem
  get TOP_HALF_CENTER() {
    return this.CONTAINER_HEIGHT / 2 - this.CARD_HEIGHT * 1.35
  },
  get BOTTOM_HALF_CENTER() {
    return (
      this.CONTAINER_HEIGHT / 2 + (this.CONTAINER_HEIGHT / 2 - this.CARD_HEIGHT)
    )
  },
  MAX_CURVE_HEIGHT: 40, // Maximum height of hand curve in pixels
}

export const HAND_STYLES = {
  CONTAINER:
    'w-full flex justify-center items-center relative overflow-hidden h-36 sm:h-40 md:h-44',
  DISABLED: 'cursor-not-allowed',
  CARD_WRAPPER: 'absolute',
  CARD_WRAPPER_POSITIONED: 'transform !duration-0', // Using !duration-0 to ensure override
}

export const LAYOUT_STYLES = {
  FLEX_CENTER: 'flex justify-center items-center',
  FLEX_COL: 'flex flex-col',
  FLEX_ROW: 'flex flex-row',
  GAP_4: 'gap-4',
  FULL_WIDTH: 'w-full',
  ROUNDED: 'rounded-lg',
  BORDER: 'border',
  BG_GRAY: 'bg-gray-100',
  PADDING_4: 'p-4',
}
