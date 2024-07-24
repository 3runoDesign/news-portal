// __tests__/SectionPost.test.tsx
import React, { act } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SectionPost } from '../src/sections/posts';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { generatePosts } from '../src/lib/generatePosts';
import { PostsResponse } from '../src/types';

// Mock the dependencies
const mockFetchPosts = jest.fn(() => Promise.resolve({ posts: [], nextPage: null }));

jest.mock('@tanstack/react-query', () => ({
    useInfiniteQuery: jest.fn(),
}));

jest.mock('react-intersection-observer', () => ({
    useInView: jest.fn(),
}));

const mockPostsResponse: PostsResponse = {
    posts: [
        {
            id: '1',
            title: 'Post 1',
            author: {
                username: "username",
                avatar: "https://avatars.githubusercontent.com/u/31679671?v=4&size=40",
                id: "1"
            },
            description: 'Description 1',
            cover: 'cover1.jpg',
            created_at: '2024-01-01T00:00:00Z',
            avatar: 'avatar1.jpg',
            comments: [{ avatar: "https://avatars.githubusercontent.com/u/31679671?v=4&size=40", id: "2" }],
            highlighted: false
        },
        {
            id: '2',
            title: 'Post 2',
            author: {
                username: "username",
                avatar: "https://avatars.githubusercontent.com/u/31679671?v=4&size=40",
                id: "2"
            },
            description: 'Description 2',
            cover: 'cover2.jpg',
            created_at: '2024-01-02T00:00:00Z',
            avatar: 'avatar2.jpg',
            comments: [{ avatar: "https://avatars.githubusercontent.com/u/31679671?v=4&size=40", id: "2" }],
            highlighted: true
        }
    ],
    nextPage: 2
};

describe('SectionPost', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should render posts and handle sorting', () => {
        (useInView as jest.Mock).mockReturnValue({ ref: jest.fn(), inView: true });

        (useInfiniteQuery as jest.Mock).mockReturnValue({
            data: {
                pages: [mockPostsResponse],
            },
            error: null,
            fetchNextPage: jest.fn(),
            isLoading: false,
            hasNextPage: true,
            isFetching: false,
            isFetchingNextPage: false,
        });

        render(<SectionPost />);

        expect(screen.getByText('Post 1')).toBeInTheDocument();
        expect(screen.getByText('Post 2')).toBeInTheDocument();
    });

    test('should display loading states correctly', () => {
        (useInView as jest.Mock).mockReturnValue({ ref: jest.fn(), inView: true });

        (useInfiniteQuery as jest.Mock).mockReturnValue({
            data: null,
            error: null,
            fetchNextPage: jest.fn(),
            isLoading: true,
            hasNextPage: true,
            isFetching: false,
            isFetchingNextPage: false,
        });

        render(<SectionPost />);

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('should display error message when there is an error', () => {
        (useInView as jest.Mock).mockReturnValue({ ref: jest.fn(), inView: true });

        (useInfiniteQuery as jest.Mock).mockReturnValue({
            data: null,
            error: { message: 'Failed to fetch posts' },
            fetchNextPage: jest.fn(),
            isLoading: false,
            hasNextPage: false,
            isFetching: false,
            isFetchingNextPage: false,
        });

        render(<SectionPost />);

        expect(screen.getByText('Error: Failed to fetch posts')).toBeInTheDocument();
    });

    test('should toggle sorting order when button is clicked', () => {
        (useInView as jest.Mock).mockReturnValue({ ref: jest.fn(), inView: true });

        (useInfiniteQuery as jest.Mock).mockReturnValue({
            data: {
                pages: [mockPostsResponse],
            },
            error: null,
            fetchNextPage: jest.fn(),
            isLoading: false,
            hasNextPage: true,
            isFetching: false,
            isFetchingNextPage: false,
        });

        render(<SectionPost />);

        expect(screen.getByRole('button', { name: /Ordenar por Data \(Decrescente\)/i })).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: /Ordenar por Data \(Decrescente\)/i }));
        expect(screen.getByRole('button', { name: /Ordenar por Data \(Crescente\)/i })).toBeInTheDocument();
    });
});

