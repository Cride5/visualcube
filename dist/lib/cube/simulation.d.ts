import { Turn } from './parsing/algorithm';
export declare enum TurnType {
    Clockwise = 0,
    CounterClockwise = 1,
    Double = 2,
}
export declare class CubeData {
    private cubeSize;
    /**
     *  Data to store face value
     *  data saved in flat array [1, 2, 3, 4, 5, 6, 7, 8, 9]
     *  maps to cube stickers like this
     *
     *  U Face
     *  1 | 2 | 3
     *  ----------
     *  4 | 5 | 6
     *  ----------
     *  7 | 8 | 9
     *
     *  Stickers are numbered in that manner starting with the U face
     *  continuing with this order U, R, F, D, L, B
     *
     *  Because each face has a differen't orientation it may not be clear
     *  how the back faces are numbered. Below is an example 3x3 mapping
     *
     *  Example numbers of 3x3 cube. nxn cubes follow the same pattern
     *
     *        B
     *      L U R
     *        F
     *        D
     *                  | 54  | 53  | 52  |
     *                   -----------------
     *                  | 51  | 50  | 49  |
     *                   -----------------
     *                  | 48  | 47  | 46  |
     * -----------------                   -----------------
     *  43  | 40  | 37     1  |  2  |  3    12  | 15  | 18
     * ----------------- ----------------- -----------------
     *  44  | 41  | 38     4  |  5  |  6    11  | 14  | 17
     * ----------------- ----------------- -----------------
     *  45  | 42  | 39     7  |  8  |  9    10  | 13  | 16
     * -----------------                   -----------------
     *                  | 19  | 20  | 21  |
     *                   -----------------
     *                  | 22  | 23  | 24  |
     *                   -----------------
     *                  | 25  | 26  | 27  |
     *
     *                  | 28  | 29  | 30  |
     *                   -----------------
     *                  | 31  | 32  | 33  |
     *                   -----------------
     *                  | 34  | 35  | 36  |
     */
    faces: {
        [face: number]: any[];
    };
    private numStickers;
    private clockwiseMapping;
    private counterClockwiseMapping;
    private doubleMapping;
    constructor(cubeSize: number, initialValues?: {
        [face: number]: any[];
    });
    private initValues();
    /**
     * Rotates values on an outer face of the rubiks cubes
     */
    private rotateFace(face, turn);
    /**
     * Rotates layer values around a given axis
     */
    private axisRotation(offset, range, axis, faceOrder, forward?, double?);
    /**
     * Rotate layers around the x axis of the cube
     */
    private xLayersRotation(offset, forward?, double?, range?);
    /**
     * Rotate layers around the y axis of the cube
     */
    private yLayersRotation(offset, forward?, double?, range?);
    /**
     * Rotate layers around the z axis of the cube
     */
    private zLayersRotation(offset, forward?, double?, range?);
    /**
     * Restricts the number of slices used in outer block moves to the cube size
     */
    private safeSlices(n);
    rTurn(turnType: TurnType, slices?: number): void;
    lTurn(turnType: TurnType, slices?: number): void;
    uTurn(turnType: TurnType, slices?: number): void;
    dTurn(turnType: TurnType, slices?: number): void;
    fTurn(turnType: TurnType, slices?: number): void;
    bTurn(turnType: TurnType, slices?: number): void;
    mTurn(turnType: TurnType): void;
    eTurn(turnType: TurnType): void;
    sTurn(turnType: TurnType): void;
    xTurn(turnType: TurnType): void;
    yTurn(turnType: TurnType): void;
    zTurn(turnType: TurnType): void;
    turn(turn: Turn): void;
}
