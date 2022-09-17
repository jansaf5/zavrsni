import { Controller, Get, Param } from '@nestjs/common';
import { ApiCallsService } from './api-calls.service';
import { OtherData, PriceData, VolumeData } from './interfaces';

@Controller('api-calls')
export class ApiCallsController {
    constructor(private apiService: ApiCallsService) { }


    @Get("getPriceData/:name/:days")
    async getPriceData(@Param("name") name: string, @Param("days") days: number): Promise<PriceData> {
        const response = await this.apiService.getPriceData(name, days);
        return response;
    }

    @Get("getVolumeData")
    async getVolumeData(@Param("name") name: string, @Param("days") days: number): Promise<VolumeData> {
        const response = await this.apiService.getVolumeData(name, days);
        return response
    }

    @Get("getOtherData")
    async getOtherData(@Param("name") name: string): Promise<OtherData> {
        const response = await this.apiService.getOtherData(name);
        return response;
    }
}
