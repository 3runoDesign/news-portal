// __mocks__/next/navigation.ts
export const useRouter = () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
    query: {},
    asPath: '',
  });
  