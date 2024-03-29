import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { TopLevelCategory, TopPageModel } from './top-page.model';
import { BeAnObject, DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { CreateTopPageDto } from './dto/create-top-page.dto';

@Injectable()
export class TopPageService {
  constructor(@InjectModel(TopPageModel) private readonly topPageModel: ModelType<TopPageModel>) {}

  async create(dto: CreateTopPageDto): Promise<CreateTopPageDto> {
    return this.topPageModel.create(dto);
  }

  async findById(id: string): Promise<CreateTopPageDto> {
    return this.topPageModel.findById(id).exec();
  }

  async findByAlias(alias: string): Promise<CreateTopPageDto> {
    return this.topPageModel.findOne({ alias }).exec();
  }

  async findAll(): Promise<CreateTopPageDto[]> {
    return this.topPageModel.find().exec();
  }

  async findByText(text: string) {
    return this.topPageModel.find({ $text: { $search: text, $caseSensitive: false } }).exec();
  }

  async findByCategory(
    firstCategory: TopLevelCategory,
  ): Promise<DocumentType<TopPageModel, BeAnObject>[]> {
    return this.topPageModel
      .aggregate([
        {
          $match: {
            firstCategory,
          },
        },
        {
          $group: {
            _id: { secondCategory: '$secondCategory' },
            pages: {
              $push: {
                alias: '$alias',
                title: '$title',
              },
            },
          },
        },
      ])
      .exec();
  }

  async deleteById(id: string): Promise<DocumentType<TopPageModel, BeAnObject>> {
    return this.topPageModel.findByIdAndDelete(id).exec();
  }

  async updateById(id: string, dto: CreateTopPageDto): Promise<CreateTopPageDto> {
    return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }
}
