# Conway's Game of Life

No dependencies! just open up `index.html` in a web browser and go.

<img src="/conway.png" width="200" height="200">

### What is it?
A JavaScript canvas representing a 2D grid of 'cells' which can be alive or dead.
On discrete time-steps, each cell updates according to a simple rule:

  1. If the cell is alive and has two or three living neighbors, it remains alive.
      otherwise, it dies, conceptually via starvation or overpopulation.
  2. If the cell is dead and has three living neighbors, it becomes alive.  otherwise,
     it remains dead.

 In this implementation, the grid is a typed array, and the alive/dead is flagged
 by the third byte.
