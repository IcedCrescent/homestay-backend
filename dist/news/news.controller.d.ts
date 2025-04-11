import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
export declare class NewsController {
    private readonly newsService;
    constructor(newsService: NewsService);
    create(createNewsDto: CreateNewsDto): import(".prisma/client").Prisma.Prisma__NewsClient<{
        name: string | null;
        image: string | null;
        id: number;
        createdAt: Date;
        text: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        name: string | null;
        image: string | null;
        id: number;
        createdAt: Date;
        text: string;
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__NewsClient<{
        name: string | null;
        image: string | null;
        id: number;
        createdAt: Date;
        text: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateNewsDto: UpdateNewsDto): import(".prisma/client").Prisma.Prisma__NewsClient<{
        name: string | null;
        image: string | null;
        id: number;
        createdAt: Date;
        text: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__NewsClient<{
        name: string | null;
        image: string | null;
        id: number;
        createdAt: Date;
        text: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
