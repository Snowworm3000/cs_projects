from GameBoard import GameBoard
from Ai import Ai
import References
import time
import random

class Player:
    def __init__(self, auto=False, test=False, aiLevel=0):
        # TODO remove gameboards for computer players
        self.boardPrimary = GameBoard(10)
        self.boardTracking = GameBoard(10)
        # What remains of the fleet
        self.fleetSize = {\
            'A' : 5, \
            'B' : 4, \
            'C' : 3, \
            'S' : 3, \
            'D' : 2, \
            'shipsRemaining': 0 }
        # Location of the ships in the fleet
        self.fleetLocation = { 'Aircraft Carrier': [], \
            'Battleship': [], \
            'Cruiser': [], \
            'Submarine': [], \
            'Destroyer': [] }
        # TODO wrte a guard that stops shots being taken against a board that hasn't been setup
        #self.fleetLocationSet = False
        # records shots taken for checking if valid shot (memory inefficient, should use GameBoard)
        self.shotsTaken = []
        self.movesMade = 0
#        self.__setBoard(self.boardPrimary, auto=auto, test=test, randomise=randomise)
        self.autoPlayer = auto
        if self.autoPlayer:
            self.aIPlayer = Ai(aiLevel=aiLevel)
        self.setFleetLocation()

    def getAutoPlayer(self):
        return self.autoPlayer

    def getBoard(self):
        return self.boardPrimary.getBoard()

    def getMovesMade(self):
        return self.movesMade

    def getTracking(self):
        return self.boardTracking.getBoard()

    def incoming(self, x, y):
        squareContents = self.boardPrimary.getSquare(x, y)
        # reverse lookup of symbol to shipname from dictionary
        shipName = next(key for key, value in References.symbols.items() if value == squareContents)
        # does not make clear what has been hit until ship has been destroyed
        if squareContents == ' ':
            self.boardPrimary.setSquare(x, y, References.getSymbols()['Miss'])
            return 'Miss', (x, y)
        elif squareContents != ' ' and self.fleetSize[squareContents] == 1:
             self.fleetSize[squareContents] -= 1
             self.fleetSize['shipsRemaining'] -= 1
             self.boardPrimary.setSquare(x, y, References.getSymbols()['Sunk'])
             self.__sinkShip(self.fleetLocation[shipName], self.boardPrimary)
             return shipName, self.fleetLocation[shipName] #currently needed for Ai to sink ships
        elif squareContents != ' ':
            self.fleetSize[squareContents] -= 1
            self.boardPrimary.setSquare(x, y, References.getSymbols()['Hit'])
            return 'Hit', (x, y)

    def takeShot(self, target, xCoord=False, yCoord=False):
        if self.autoPlayer:
            x, y = self.aIPlayer.takeShot()
            result = target.incoming(x, y)
            self.__recordShot(result, x, y)
        else:
            if (xCoord,yCoord) in self.shotsTaken:
                return -1
            self.shotsTaken.append((xCoord,yCoord))
            result = target.incoming(xCoord, yCoord)
            self.__recordShot(result, xCoord, yCoord)
        return result

    def __recordShot(self, result, x, y):
        if self.autoPlayer:
            self.aIPlayer.recordShot(result, x, y)
        elif result[0] in References.getShips():
            self.__sinkShip(result[1], self.boardTracking)
        else:
            self.boardTracking.setSquare(x, y, References.symbols[result[0]])

    def __sinkShip(self, locations, board):
        # iterate over length of ship replacing hit symbol with sunk symbol
        for i in locations:
            board.setSquare(i[0], i[1], References.getSymbols()['Sunk'])

    def __writeShip(self, grid, xCoord, yCoord, direction, shipName):
        # sends messages to board to set the locations of the fleet.
        for i in range(References.getShips()[shipName]):
            grid.setSquare(xCoord, yCoord, References.getSymbols()[shipName])
            #record ship coords.
            self.fleetLocation[shipName].append((xCoord, yCoord))
            if direction == 0:
                xCoord += 1
            elif direction == 1:
                yCoord += 1
        self.fleetSize['shipsRemaining'] += 1

    def __checkPlacement(self, grid, xCoord, yCoord, direction, shipName):
        if (xCoord+References.getShips()[shipName] > 10 and direction == 0)\
            or (yCoord+References.getShips()[shipName] > 10 and direction == 1):
            return False
        for i in range(References.getShips()[shipName]):
            if grid.getBoard()[yCoord][xCoord] != ' ':
                return False
            if direction == 0:
                xCoord += 1
            elif direction == 1:
                yCoord += 1
        return True

    def __placeShip(self, grid, xCoord, yCoord, direction, shipName):
        if self.__checkPlacement(grid, xCoord, yCoord, direction, shipName):
            self.__writeShip(grid, xCoord, yCoord, direction, shipName)
            return True
        return False

    def setFleetLocation(self, shipLocations=[], randomise=False):
        """ Takes a list containing the locations of the ship's coordinates in the order
        [[shipName, (xCoord, yCoord), direction],...]
        These need to have the correct number of locations in or it will not be accepted,
        valid ship placement will be also be checked and an error message returned if necessary.
        Assuming valid inputs, locations will be written to Player location dictionary, and
        a GameBoard instantiated. """
        # guard to ensure that fleet location is not already populated.
        print('setFleetlocation')
        # TODO check that shipLocations is of correct size
        if self.fleetSize['shipsRemaining'] == 5:
            print('true fleetLocation')
            return False
        elif self.autoPlayer or randomise:
            #print('setting random')
            self.__randomPlacement(self.boardPrimary)
            print('auto player board setup done')
        elif len(shipLocations) >= 1:
            print('setting from list')
            for eachShip in shipLocations:
                print(eachShip)
                shipName, coords, direction = eachShip
                x,y = coords
                if not self.__placeShip(self.boardPrimary, x, y, direction, shipName):
                    print('invalid placement in Player.setFleetLocation()')
                    return False
            print(f"{shipName} location set")
            return True
        elif len(shipLocations) == 10:
            print('only one ship')
            shipName, (x,y), direction = shipLocations
            if not self.__placeship(self.boardPrimary, x, y, direction, shipName):
                return "Cannot place "+shipName+", location invalid."
        else:
            print('Empty board created')

    def __randomPlacement(self, board):
        print('randomPlacement')
        #if self.fleetLocationSet:
        #    return False
        #else:
        for eachShip in References.getShips().keys():
            placed = False
            while not placed:
                x = random.randrange(10)
                y = random.randrange(10)
                direction = random.randrange(2)
                placed = self.__placeShip(board, x, y, direction, eachShip)
        self.fleetLocationSet = True
        return True

"""    def __getCoords(self, placing=False):
        failed = True
        while failed:
            try:
                xCoord = int(input('X-coordinate (0-9): '))
                if xCoord < 0 or xCoord > 9:
                    raise ValueError
                yCoord = int(input('y-coordinate (0-9): '))
                if yCoord < 0 or yCoord > 9:
                    raise ValueError
                direction = False #default for reuse
                if placing:
                    direction = input('To the right, or up? (r/u): ')
                    if not(direction == 'r' or direction == 'u'):
                        raise ValueError
                    elif direction == 'r':
                        direction = 0
                    elif direction == 'u':
                        direction = 1
                failed = False
            except ValueError:
                print('Sorry, your input was not recognised, please try again')
        if placing == False:
            return xCoord, yCoord, direction
        return xCoord, yCoord, direction"""


