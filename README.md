### README - Object-Based IDE

Welcome to the Object-Based IDE! This IDE allows you to create and manipulate objects on a virtual workspace using JavaScript. Below is a guide on how to use the IDE and program objects effectively.

---

## Getting Started

### 1. Setting Up the Workspace

1. **Launch the IDE**: Open the `index.html` file in your web browser to start using the IDE.
2. **Create Objects**: Drag and drop objects from the menu onto the workspace area.
3. **Resize and Position**: Click and drag the objects to resize and reposition them as needed.

### 2. Programming Objects

You can program objects by interacting with them via JavaScript. The IDE provides functions for various object manipulations and animations.

#### Key Functions

- **`moveInCircle(id, radius, speed, duration)`**: Moves an object in a circular path.
- **`isWithinArea(id, area)`**: Checks if an object is within a specified area.
- **`changeColor(id, color)`**: Changes the background color of an object.
- **`getObjectProperties(id)`**: Retrieves properties of an object.
- **`scaleObject(id, scaleX, scaleY)`**: Scales an object by given factors.
- **`rotateObject(id, angle)`**: Rotates an object by a specified angle.
- **`getObjectPosition(id)`**: Gets the current position of an object relative to the viewport.
- **`fadeObject(id, duration)`**: Animates the object’s opacity from 0 to 1.
- **`isNearPoint(id, point, distance)`**: Checks if an object is within a specific distance from a point.
- **`getDistanceBetweenObjects(idA, idB)`**: Gets the distance between the centers of two objects.
- **`moveAlongPath(id, path, duration)`**: Moves an object along a defined path.
- **`blinkObject(id, frequency, duration)`**: Blinks an object with a given frequency and duration.

### 3. Example Usage

#### Example 1: Moving an Object in a Circle

To move an object with ID `box1` in a circular path with a radius of 100 pixels, speed of 2 degrees per frame, and animation duration of 1 second:

```javascript
moveInCircle('box1', 100, 2, 1000);
```

#### Example 2: Checking Object Position

To check if an object with ID `box2` is within a specified area:

```javascript
const area = { left: 50, right: 150, top: 50, bottom: 150 };
const isWithin = isWithinArea('box2', area);
console.log('Object is within the area:', isWithin);
```

#### Example 3: Changing an Object's Color

To change the background color of an object with ID `box3` to red:

```javascript
changeColor('box3', 'red');
```

#### Example 4: Retrieving Object Properties

To get the properties of an object with ID `box4`:

```javascript
const properties = getObjectProperties('box4');
console.log('Object properties:', properties);
```

#### Example 5: Scaling and Rotating an Object

To scale an object with ID `box5` to twice its size and rotate it by 45 degrees:

```javascript
scaleObject('box5', 2, 2);
rotateObject('box5', 45);
```

#### Example 6: Moving Along a Path

To move an object with ID `box6` along a path defined by an array of points:

```javascript
const path = [
    { x: 100, y: 100 },
    { x: 200, y: 100 },
    { x: 200, y: 200 },
    { x: 100, y: 200 },
    { x: 100, y: 100 }
];
moveAlongPath('box6', path, 5000); // Duration in milliseconds
```

#### Example 7: Blinking an Object

To make an object with ID `box7` blink with a frequency of 2 blinks per second for 5 seconds:

```javascript
blinkObject('box7', 2, 5);
```

---

Feel free to explore and experiment with these functions to create dynamic and interactive objects in your simulations and games. If you have any questions or need further assistance, please refer to the documentation or contact support.

Happy coding!
