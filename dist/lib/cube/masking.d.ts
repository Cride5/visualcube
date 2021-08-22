import { Masking } from './constants';
export declare type FaceValues = {
    [face: number]: any[];
};
export declare function makeMasking(masking: Masking, cubeSize: number): FaceValues;
