import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarsService {
    private cars: Car[] = [
        {
            id: uuid(),
            brand: 'Kia',
            model: 'Rio',
        },
        {
            id: uuid(),
            brand: 'Mazda',
            model: 'Mazda3',
        },
        {
            id: uuid(),
            brand: 'Honda',
            model: 'City',
        },
    ];

    findAll() {
        return this.cars;
    }

    findById(id: string) {
        const car = this.cars.find((car) => car.id === id);

        if (!car) throw new NotFoundException(`Car with id '${id}' not found`);

        return car;
    }

    create(createCarDto: CreateCarDto) {
        const newCar: Car = {
            id: uuid(),
            ...createCarDto,
        };

        this.cars.push(newCar);
    }

    update(id: string, updateCarDto: UpdateCarDto) {
        let carDB = this.findById(id);

        if (updateCarDto.id && updateCarDto.id !== id) {
            throw new BadRequestException(
                `Query param's ID: ${id}, is different from Body's car ID: ${updateCarDto.id}`,
            );
        }

        this.cars = this.cars.map((car) => {
            if (car.id === id) {
                carDB = {
                    ...carDB,
                    ...updateCarDto,
                };

                return carDB;
            }

            return car;
        });
    }

    delete(id: string) {
        const carDB = this.findById(id);

        this.cars = this.cars.filter((car) => car.id !== carDB.id);
    }
}
