import { Car } from 'src/cars/interfaces/car.interface';
import { v4 as uuid } from 'uuid';

export const CARS_SEED: Car[] = [
    {
        id: uuid(),
        brand: 'Kia',
        model: 'Rio',
    },
    {
        id: uuid(),
        brand: 'Kia',
        model: 'Forte',
    },
    {
        id: uuid(),
        brand: 'Honda',
        model: 'Civic',
    },
    {
        id: uuid(),
        brand: 'Mazda',
        model: 'Mazda3',
    },
];
