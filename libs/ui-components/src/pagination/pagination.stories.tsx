import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from '.';
import { useState } from 'react';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A pagination component for navigating through multiple pages of content.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    page: {
      control: 'number',
      description: 'Current page number (1-based)',
    },
    pageCount: {
      control: 'number',
      description: 'Total number of pages',
    },
    limit: {
      control: 'number',
      description: 'Number of items per page',
    },
    total: {
      control: 'number',
      description: 'Total number of items',
    },
    customClasses: {
      control: 'object',
      description: 'Custom CSS classes for different parts of the pagination',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

// Basic pagination
export const Default: Story = {
  args: {
    page: 1,
    pageCount: 10,
    limit: 10,
    total: 100,
    onChangePage: () => {},
  },
};

// Interactive Example
export const Interactive = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const total = 100;
  const pageCount = Math.ceil(total / limit);

  return (
    <div className="min-w-[500px]">
      <div className="mb-4 text-sm text-gray-600">
        Current Page: {page} of {pageCount}
      </div>
      <Pagination
        page={page}
        pageCount={pageCount}
        limit={limit}
        total={total}
        onChangePage={setPage}
      />
    </div>
  );
};

// With few pages
export const FewPages: Story = {
  args: {
    page: 1,
    pageCount: 3,
    limit: 10,
    total: 30,
    onChangePage: () => {},
  },
};

// With many pages
export const ManyPages: Story = {
  args: {
    page: 5,
    pageCount: 20,
    limit: 10,
    total: 200,
    onChangePage: () => {},
  },
};

// First page selected
export const FirstPage: Story = {
  args: {
    page: 1,
    pageCount: 10,
    limit: 10,
    total: 100,
    onChangePage: () => {},
  },
};

// Last page selected
export const LastPage: Story = {
  args: {
    page: 10,
    pageCount: 10,
    limit: 10,
    total: 100,
    onChangePage: () => {},
  },
};

// Middle page selected
export const MiddlePage: Story = {
  args: {
    page: 5,
    pageCount: 10,
    limit: 10,
    total: 100,
    onChangePage: () => {},
  },
};

// Different page ranges
export const PageRanges = () => {
  const [states, setStates] = useState([
    { page: 1, limit: 5, total: 25 },
    { page: 1, limit: 10, total: 50 },
    { page: 1, limit: 20, total: 100 },
  ]);

  return (
    <div className="space-y-8">
      {states.map((state, index) => (
        <div key={index}>
          <div className="mb-2 text-sm text-gray-600">
            {state.limit} items per page, {state.total} total items
          </div>
          <Pagination
            page={state.page}
            pageCount={Math.ceil(state.total / state.limit)}
            limit={state.limit}
            total={state.total}
            onChangePage={newPage => {
              const newStates = [...states];
              newStates[index].page = newPage;
              setStates(newStates);
            }}
          />
        </div>
      ))}
    </div>
  );
};
