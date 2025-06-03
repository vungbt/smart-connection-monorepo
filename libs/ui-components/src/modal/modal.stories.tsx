import type { Meta, StoryObj } from '@storybook/react';
import { ModalBase } from '.';
import { useState } from 'react';
import { Button } from '../button';

const meta: Meta<typeof ModalBase> = {
  title: 'Components/Modal',
  component: ModalBase,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A modal dialog component with smooth animations using Framer Motion.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the modal is visible',
    },
    onClose: {
      description: 'Callback function when the modal is closed',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the modal content',
    },
    classNameBackdrop: {
      control: 'text',
      description: 'Additional CSS classes for the modal backdrop',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ModalBase>;

// Basic Modal
export const Default: Story = {
  args: {
    isOpen: true,
    children: (
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Modal Title</h2>
        <p className="mb-4">This is a basic modal with some content.</p>
        <div className="flex justify-end">
          <Button>Close</Button>
        </div>
      </div>
    ),
  },
};

// Interactive Modal
export const Interactive = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <ModalBase isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="p-6 min-w-[400px]">
          <h2 className="text-xl font-bold mb-4">Interactive Modal</h2>
          <p className="mb-4">
            This modal can be opened and closed using the button or by clicking outside.
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)}>Confirm</Button>
          </div>
        </div>
      </ModalBase>
    </div>
  );
};

// Different Sizes
export const Sizes = () => {
  const [openModal, setOpenModal] = useState<'sm' | 'md' | 'lg' | null>(null);

  return (
    <div className="flex gap-2">
      <Button onClick={() => setOpenModal('sm')}>Small Modal</Button>
      <Button onClick={() => setOpenModal('md')}>Medium Modal</Button>
      <Button onClick={() => setOpenModal('lg')}>Large Modal</Button>

      <ModalBase
        isOpen={openModal === 'sm'}
        onClose={() => setOpenModal(null)}
        className="max-w-sm"
      >
        <div className="p-4">
          <h3 className="text-lg font-bold mb-2">Small Modal</h3>
          <p>This is a small-sized modal dialog.</p>
          <div className="mt-4 flex justify-end">
            <Button onClick={() => setOpenModal(null)}>Close</Button>
          </div>
        </div>
      </ModalBase>

      <ModalBase
        isOpen={openModal === 'md'}
        onClose={() => setOpenModal(null)}
        className="max-w-md"
      >
        <div className="p-6">
          <h3 className="text-xl font-bold mb-3">Medium Modal</h3>
          <p>This is a medium-sized modal dialog with more content and padding.</p>
          <div className="mt-6 flex justify-end">
            <Button onClick={() => setOpenModal(null)}>Close</Button>
          </div>
        </div>
      </ModalBase>

      <ModalBase
        isOpen={openModal === 'lg'}
        onClose={() => setOpenModal(null)}
        className="max-w-lg"
      >
        <div className="p-8">
          <h3 className="text-2xl font-bold mb-4">Large Modal</h3>
          <p className="mb-4">
            This is a large-sized modal dialog with even more content and padding. It's suitable for
            displaying forms or detailed information.
          </p>
          <div className="mt-8 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpenModal(null)}>
              Cancel
            </Button>
            <Button onClick={() => setOpenModal(null)}>Confirm</Button>
          </div>
        </div>
      </ModalBase>
    </div>
  );
};

// Complex Content
export const ComplexContent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Open Complex Modal</Button>
      <ModalBase isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="p-6 min-w-[500px]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">User Profile</h2>
            <Button variant="text" icon="x-mark" onClick={() => setIsOpen(false)} />
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Personal Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600">Name</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    defaultValue="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Email</label>
                  <input
                    type="email"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    defaultValue="john@example.com"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Preferences</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span>Receive email notifications</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>Subscribe to newsletter</span>
                </label>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)}>Save Changes</Button>
          </div>
        </div>
      </ModalBase>
    </div>
  );
};
