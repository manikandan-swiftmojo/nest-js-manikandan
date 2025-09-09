import { Injectable, NotFoundException } from '@nestjs/common';
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
        return this.prisma.user.update({
            where: { id },
            data: updateUserDto,
        });
    }

    async remove(id: number) {
        return this.prisma.user.delete({ where: { id } });
    }

}
