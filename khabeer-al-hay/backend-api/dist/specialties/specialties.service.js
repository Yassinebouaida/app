"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecialtiesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../config/prisma.service");
let SpecialtiesService = class SpecialtiesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.specialty.findMany({
            where: { isActive: true },
            orderBy: { nameAr: 'asc' },
        });
    }
    async findById(id) {
        return this.prisma.specialty.findUnique({
            where: { id },
        });
    }
    async create(data) {
        return this.prisma.specialty.create({
            data,
        });
    }
    async update(id, data) {
        return this.prisma.specialty.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        return this.prisma.specialty.update({
            where: { id },
            data: { isActive: false },
        });
    }
    async seedSpecialties() {
        const specialties = [
            {
                nameAr: 'كهربائي',
                nameEn: 'Electrician',
                description: 'تركيب وصيانة الأنظمة الكهربائية',
                icon: 'electrical_services',
            },
            {
                nameAr: 'سباك',
                nameEn: 'Plumber',
                description: 'إصلاح وصيانة أنظمة السباكة والمياه',
                icon: 'plumbing',
            },
            {
                nameAr: 'نجار',
                nameEn: 'Carpenter',
                description: 'أعمال النجارة والأثاث الخشبي',
                icon: 'construction',
            },
            {
                nameAr: 'فني تكييف',
                nameEn: 'AC Technician',
                description: 'صيانة وإصلاح أجهزة التكييف',
                icon: 'ac_unit',
            },
            {
                nameAr: 'دهان',
                nameEn: 'Painter',
                description: 'دهان الجدران والأسطح',
                icon: 'format_paint',
            },
            {
                nameAr: 'فني أجهزة',
                nameEn: 'Appliance Repair',
                description: 'صيانة الأجهزة المنزلية',
                icon: 'home_repair_service',
            },
        ];
        for (const specialty of specialties) {
            await this.prisma.specialty.upsert({
                where: { nameEn: specialty.nameEn },
                update: {},
                create: specialty,
            });
        }
    }
};
exports.SpecialtiesService = SpecialtiesService;
exports.SpecialtiesService = SpecialtiesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SpecialtiesService);
//# sourceMappingURL=specialties.service.js.map