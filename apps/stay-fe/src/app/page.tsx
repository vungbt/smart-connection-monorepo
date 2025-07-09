'use client';
import { useApiQuery, useApiMutation } from '@smart-connection-monorepo/api-client';
import { Table, TableColumn } from '@smart-connection-monorepo/ui-components';
import { useState } from 'react';

// Config type definition
type Config = {
  id: string;
  config: number;
  waterFee: number;
  electricFee: number;
  commonServiceFee: number;
  internetFee: number;
  type: string;
  isSpecialRoom: boolean;
};

type ApiError = Error;

export default function ConfigsPage() {
  const [editing, setEditing] = useState<Config | null>(null);
  const [form, setForm] = useState<Partial<Config>>({});

  // GET configs
  const {
    data: configs,
    error,
    isError,
    isLoading,
  } = useApiQuery<Config[]>(
    {
      endpoint: '/configs',
      queryKey: ['configs'],
    },
    {
      onError: (error: ApiError) => {
        console.error('Error fetching configs:', error);
      },
    }
  );

  // Create config
  const { mutate: createConfig } = useApiMutation<Config, Partial<Config>>('post', {
    onSuccess: () => {
      setForm({});
    },
    onError: (error: ApiError) => {
      console.error('Error creating config:', error);
    },
  });

  // Update config
  const { mutate: updateConfig } = useApiMutation<Config, Partial<Config>>('put', {
    onSuccess: () => {
      setEditing(null);
      setForm({});
    },
    onError: (error: ApiError) => {
      console.error('Error updating config:', error);
    },
  });

  // Delete config
  const { mutate: deleteConfig } = useApiMutation<unknown, Record<string, never>>('delete', {
    onError: (error: ApiError) => {
      console.error('Error deleting config:', error);
    },
  });

  const onEdit = (config: Config) => {
    setEditing(config);
    setForm(config);
  };

  const onDelete = (id: string) => {
    if (confirm('Delete this config?')) {
      deleteConfig({ endpoint: `/configs/${id}`, body: {} });
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      updateConfig({ endpoint: `/configs/${editing.id}`, body: form });
    } else {
      createConfig({ endpoint: '/configs', body: form });
    }
  };

  // Show error state
  if (isError) {
    return <div>Error: {error instanceof Error ? error.message : 'Something went wrong'}</div>;
  }

  const columns: TableColumn<Config> = [
    { header: 'ID', accessorKey: 'id' },
    { header: 'Room Fee', accessorKey: 'config' },
    { header: 'Water Fee', accessorKey: 'waterFee' },
    { header: 'Electric Fee', accessorKey: 'electricFee' },
    { header: 'Common Service Fee', accessorKey: 'commonServiceFee' },
    { header: 'Internet Fee', accessorKey: 'internetFee' },
    { header: 'Type', accessorKey: 'type' },
    { header: 'Special Room', accessorKey: 'isSpecialRoom' },
    {
      header: 'Actions',
      cell: ({ row }) => (
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => onEdit(row.original)}>Edit</button>
          <button onClick={() => onDelete(row.original.id)}>Delete</button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-5">
      <h2>Configs CRUD Demo</h2>
      <form
        onSubmit={onSubmit}
        style={{ marginBottom: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}
      >
        <input
          placeholder="Room Fee"
          type="number"
          value={form.config ?? ''}
          onChange={e => setForm(f => ({ ...f, config: Number(e.target.value) }))}
          required
        />
        <input
          placeholder="Water Fee"
          type="number"
          value={form.waterFee ?? ''}
          onChange={e => setForm(f => ({ ...f, waterFee: Number(e.target.value) }))}
          required
        />
        <input
          placeholder="Electric Fee"
          type="number"
          value={form.electricFee ?? ''}
          onChange={e => setForm(f => ({ ...f, electricFee: Number(e.target.value) }))}
          required
        />
        <input
          placeholder="Common Service Fee"
          type="number"
          value={form.commonServiceFee ?? ''}
          onChange={e => setForm(f => ({ ...f, commonServiceFee: Number(e.target.value) }))}
          required
        />
        <input
          placeholder="Internet Fee"
          type="number"
          value={form.internetFee ?? ''}
          onChange={e => setForm(f => ({ ...f, internetFee: Number(e.target.value) }))}
          required
        />
        <input
          placeholder="Type"
          type="text"
          value={form.type ?? ''}
          onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
          required
        />
        <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <input
            type="checkbox"
            checked={!!form.isSpecialRoom}
            onChange={e => setForm(f => ({ ...f, isSpecialRoom: e.target.checked }))}
          />
          Special Room
        </label>
        <button type="submit">{editing ? 'Update' : 'Create'}</button>
        {editing && (
          <button
            type="button"
            onClick={() => {
              setEditing(null);
              setForm({});
            }}
          >
            Cancel
          </button>
        )}
      </form>
      <Table
        columns={columns}
        data={Array.isArray(configs) ? configs : []}
        rowKey="id"
        loading={isLoading}
        customClasses={{ root: 'h-[500px]' }}
      />
    </div>
  );
}
