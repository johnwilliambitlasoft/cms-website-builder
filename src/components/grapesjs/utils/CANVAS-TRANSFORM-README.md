# Canvas Transformation in GrapesJS Editor

This document explains how the canvas transformation works in the GrapesJS editor to ensure the canvas is always fully visible within its container.

## Overview

The canvas transformation feature automatically scales and centers the GrapesJS editing canvas to fit within the container when the selected device width is larger than the container width. This ensures that the entire canvas is visible even when the container is smaller than the device being emulated.

## Key Features

1. **Automatic Scaling**: The canvas is automatically scaled down to fit within the container when a device is selected.
2. **Center Alignment**: The canvas is centered within the container for optimal viewing.
3. **Dynamic Updates**: The transformation updates whenever:
   - The selected device changes
   - The window is resized
   - The container size changes
   - The user presses Ctrl+=

## Formula

The transformation is calculated using the following formula:

```javascript
// Calculate scale based on container-to-device ratio
const scale = Math.min(containerWidth / deviceWidth, containerHeight / deviceHeight);
const roundedScale = Math.floor(scale * 100) / 100;

// Calculate translation to center the canvas
const translateX = -((deviceWidth - containerWidth / roundedScale) / 2);
const translateY = -((deviceHeight - containerHeight / roundedScale) / 2);

// Apply the transform
element.style.transform = `scale(${roundedScale}) translate(${Math.round(translateX)}px, ${Math.round(translateY)}px)`;
```

This formula ensures that:
1. The canvas is scaled proportionally to fit within the container
2. The canvas is centered both horizontally and vertically
3. No part of the canvas is cut off or hidden

## Example Transformations

| Container Size | Device Size  | Resulting Transform                       |
|----------------|--------------|------------------------------------------|
| 449×486        | 1200×800     | `scale(0.37) translate(-376px, -401px)`  |
| 596×552        | 1200×800     | `scale(0.49) translate(-303px, -278px)`  |
| 719×607        | 1200×800     | `scale(0.59) translate(-239px, -201px)`  |

## Usage

The canvas transformation is applied automatically, but you can also trigger it manually:

1. **Keyboard Shortcut**: Press `Ctrl+=` to fit the canvas to the container
2. **Device Change**: The transform is automatically applied when changing devices
3. **Window Resize**: The transform updates when the window is resized

## Implementation Files

- `src/components/grapesjs/utils/canvasUtils.js`: Contains the main transformation logic
- `src/components/grapesjs/index.jsx`: Implements the canvas transformation in the editor
- `src/components/grapesjs/grapesjs.css`: Contains CSS styles for the transformed canvas

## How It Works

1. When the editor initializes, it sets up event listeners for device changes and window resizes
2. When a device is selected, the `updateCanvasTransform` function calculates the appropriate scale and translation
3. The transform is applied to the canvas element via CSS transform property
4. A resize observer monitors the container size and updates the transform as needed

This ensures that the canvas is always fully visible and properly scaled, regardless of the container or device size.
