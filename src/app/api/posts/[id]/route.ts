import { faker } from '@faker-js/faker';
import { NextRequest, NextResponse } from 'next/server';

const generatePostDetails = (postId: string) => {
    const authorId = faker.string.uuid();
    return {
        id: postId,
        title: faker.lorem.sentence(),
        author: {
            id: authorId,
            avatar: faker.image.avatar(),
            username: faker.internet.userName(),
        },
        description: faker.lorem.paragraph(),
        cover: faker.image.urlPicsumPhotos({ width: 1080, height: 1080 }),
        created_at: faker.date.past().toISOString(),
        avatar: faker.image.avatar(),
        comments: [
            {
                id: faker.string.uuid(),
                content: faker.lorem.sentence(),
                postId,
                authorId,
            },
            {
                id: faker.string.uuid(),
                content: faker.lorem.sentence(),
                postId,
                authorId: faker.string.uuid(),
            },
        ],
        highlighted: faker.datatype.boolean(),
    };
};

export async function GET(req: NextRequest) {
    const urlPath = req.nextUrl.pathname;
    const id = urlPath.split('/').pop() || '';
  
    if (typeof id === 'string' && id.trim() !== '') {
        const postDetails = generatePostDetails(id);
    
        return NextResponse.json(postDetails);
      } else {
        return NextResponse.json({ message: 'Post not found' }, { status: 404 });
      }
  }