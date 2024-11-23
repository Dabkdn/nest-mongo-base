import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BaseRepository<T> {
  constructor(protected readonly model: Model<T>) {}

  async create(createDto: any): Promise<any> {
    const createdDoc = new this.model(createDto);
    return createdDoc.save();
  }

  async findAll(): Promise<T[]> {
    return this.model.find().lean() as any;
  }

  async find(params: any): Promise<T[]> {
    return this.model.find(params);
  }

  async findOne(param: string | any): Promise<T | null> {
    if (typeof param === "string") {
      return this.model.findById(param).exec();
    }
    return this.model.findOne(param).lean() as any;
  }

  async update(id: any, updateDto: any): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, updateDto, { new: true }).exec();
  }

  async remove(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  }
}
