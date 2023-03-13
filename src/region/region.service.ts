import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Region } from './models/region.model';

@Injectable()
export class RegionService {
  constructor(
    @InjectModel(Region)
    private readonly regionModel: typeof Region,
  ) {}

  async findAll(): Promise<Region[]> {
    return this.regionModel.findAll();
  }

  async findById(id: number): Promise<Region> {
    return this.regionModel.findByPk(id);
  }

  async create(data: Partial<Region>): Promise<Region> {
    return this.regionModel.create(data);
  }

  async update(id: number, data: Partial<Region>) {
    return this.regionModel.update(data, {
      where: { id },
    });
  }

  async delete(id: number): Promise<number> {
    return this.regionModel.destroy({
      where: { id },
    });
  }
}
