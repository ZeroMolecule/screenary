import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { ZodValidationPipe } from '../shared/pipes/zod-validation.pipe';
import { CreateNoteDto, createNoteSchema } from './dtos/create-note.dto';
import { AuthUser } from '../shared/decorators/auth-user.decorator';
import { User } from '@prisma/client';
import { Project } from '../shared/decorators/project.decorator';
import { ProjectGuard } from '../shared/guards/project.guard';
import { List } from '../shared/decorators/list.decorator';
import { PaginationQuery } from '../shared/decorators/pagination-query.decorator';
import { UpdateNoteDto, updateNoteSchema } from './dtos/update-note.dto';

@Controller('notes')
@UseGuards(ProjectGuard)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  async create(
    @Body(new ZodValidationPipe(createNoteSchema)) data: CreateNoteDto,
    @Project() project: Project,
    @AuthUser() user: User
  ) {
    return this.notesService.create(data, project.id, user);
  }

  @Put(':id')
  async update(
    @Body(new ZodValidationPipe(updateNoteSchema)) data: UpdateNoteDto,
    @Param('id') id: string,
    @Project() project: Project,
    @AuthUser() user: User
  ) {
    return this.notesService.update(id, project.id, data, user);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Project() project: Project,
    @AuthUser() user: User
  ) {
    return this.notesService.findOne(id, project.id, user);
  }

  @Get()
  @List()
  async findMany(
    @Project() project: Project,
    @AuthUser() user: User,
    @PaginationQuery pagination: PaginationQuery
  ) {
    const { list, total } = await this.notesService.findMany(
      project.id,
      user,
      pagination
    );
    return {
      data: list,
      pagination: {
        ...pagination,
        total,
      },
    };
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Project() project: Project,
    @AuthUser() user: User
  ) {
    return this.notesService.remove(id, project.id, user);
  }
}
