import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { creteUserDto } from './create-user-dto';
import { singUpResponse } from './users';
import { PrismaService } from 'src/prisma.service';
import { updateUserDto } from './create-user-dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }
    async signup(payload: creteUserDto): Promise<singUpResponse> {
        return await this.prisma.user.create({
            data: payload,
            select: {
                email: true,
                name: true,
                id: true
            }
        })
    }

    async findAll() {
        return this.prisma.user.findMany();
    }

    async findOne(id: number) {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        return user;
    }

    async update(id: number, updateUserDto: updateUserDto) {
        try {
            return await this.prisma.user.update({
                where: { id },  // id is a number
                data: updateUserDto,
            });
        } catch (error) {
            console.error('Prisma update error:', error);  // Correct log message

            throw new InternalServerErrorException(
                'Unexpected error during user update: ' + error.message
            );
        }
    }

    async remove(id: number) {
        try {
            return await this.prisma.user.delete({
                where: { id },
            });
        } catch (error) {
            console.error('Prisma delete error:', error);  // ✅ Log full error

            if (error.code === 'P2025') {
                throw new NotFoundException(`User with id ${id} not found.`);
            }

            // Throw a more detailed error
            throw new InternalServerErrorException('Unexpected error during user deletion.' + error);
        }
    }
}
