import { faker } from '@faker-js/faker';
import { Post, Author, CommentResume } from '../types';

const generateAuthor = (): Author  => ({
  id: faker.string.uuid(),
  avatar: faker.image.avatarGitHub(),
  username: faker.internet.userName()
});

const generateComment = (): CommentResume => ({
  id: faker.string.uuid(),
  avatar: faker.image.avatarGitHub(),
});

export const generatePosts = (page: number, pageSize: number): Post[] => {
  return Array.from({ length: pageSize }).map(() => ({
    id: faker.string.uuid(),
    title: faker.lorem.sentence(),
    author: generateAuthor(),
    description: faker.lorem.paragraph(),
    cover: faker.image.urlPicsumPhotos({ width: 1080, height: 1080 }),
    created_at: faker.date.past().toISOString(),
    avatar: faker.image.avatar(),
    comments: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }).map(generateComment),
    highlighted: faker.datatype.boolean(),
  }));
};