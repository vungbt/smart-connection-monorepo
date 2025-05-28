'use client';
import {
  Button,
  CheckboxGroup,
  Input,
  InputPassword,
  ModalConfirm,
  RadioGroup,
  RenderIcon,
  Tabs,
} from '@smart-connection-monorepo/ui-components';
import { useState } from 'react';
export default function Index() {
  const [tabActive, setTabActive] = useState(0);
  const [selected, setSelected] = useState('option1');
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    console.log('Button clicked');
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen gap-y-7 pt-6">
        {/* RADIO */}
        <RadioGroup
          name="example4"
          value={selected}
          size="small"
          color="success"
          onChange={setSelected}
          options={[
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Disabled', value: 'option3', disabled: true },
          ]}
        />
        <RadioGroup
          name="example5"
          value={selected}
          color="error"
          onChange={setSelected}
          options={[
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Disabled', value: 'option3', disabled: true },
          ]}
        />
        <RadioGroup
          name="example6"
          value={selected}
          size="large"
          color="secondary"
          onChange={setSelected}
          options={[
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Disabled', value: 'option3', disabled: true },
          ]}
        />

        <RadioGroup
          name="example"
          value={selected}
          size="small"
          color="neutral"
          optionType="button"
          onChange={setSelected}
          options={[
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Disabled', value: 'option3', disabled: true },
          ]}
        />

        <RadioGroup
          name="example1"
          color="pending"
          value={selected}
          optionType="button"
          onChange={setSelected}
          options={[
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Disabled', value: 'option3', disabled: true },
          ]}
        />

        <RadioGroup
          name="example2"
          value={selected}
          size="large"
          color="secondary"
          optionType="button"
          onChange={setSelected}
          options={[
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Disabled', value: 'option3', disabled: true },
          ]}
        />

        {/* CHECKBOX */}
        <CheckboxGroup
          name="checkbox1"
          value={selected}
          size="small"
          color="error"
          onChange={setSelected}
          options={[
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Disabled', value: 'option3', disabled: true },
          ]}
        />
        <CheckboxGroup
          name="checkbox1"
          value={selected}
          size="middle"
          color="success"
          onChange={setSelected}
          options={[
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Disabled', value: 'option3', disabled: true },
          ]}
        />
        <CheckboxGroup
          name="checkbox1"
          color="secondary"
          value={selected}
          size="large"
          onChange={setSelected}
          options={[
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Disabled', value: 'option3', disabled: true },
          ]}
        />

        <Button onClick={() => setShowModal(!showModal)}>Click show modal</Button>
        <ModalConfirm
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          message="Test warning"
        />

        {/*  TABS */}
        <Tabs
          tabs={[
            { label: 'Small 1', value: 0, icon: 'arrow-up-tray' },
            { label: 'Small 2', value: 1, icon: 'arrow-up-tray' },
          ]}
          color="secondary"
          size="small"
          variant="card"
          selectedIndex={tabActive}
          onChange={value => setTabActive(value)}
        />
        <Tabs
          tabs={[
            { label: 'Middle 1', value: 0, icon: 'arrow-up-tray' },
            { label: 'Middle 2', value: 1, icon: 'arrow-up-tray' },
          ]}
          variant="card"
          color="success"
          selectedIndex={tabActive}
          onChange={value => setTabActive(value)}
        />
        <Tabs
          tabs={[
            { label: 'Large 1', value: 0, icon: 'arrow-up-tray' },
            { label: 'Large 2', value: 1, icon: 'arrow-up-tray' },
          ]}
          color="pending"
          size="large"
          variant="card"
          selectedIndex={tabActive}
          onChange={value => setTabActive(value)}
        />
        <div className="flex flex-row gap-x-4">
          <Button
            loading
            icon="home"
            size="small"
            onClick={handleClick}
            color="primary"
            variant="solid"
          >
            Click me
          </Button>
          <Button
            iconRight="arrow-up-tray"
            size="middle"
            onClick={handleClick}
            color="secondary"
            variant="solid"
          >
            Click me
          </Button>
          <Button
            icon="arrow-up-tray-solid"
            size="large"
            onClick={handleClick}
            color="success"
            variant="solid"
          >
            Click me
          </Button>
          <Button size="middle" onClick={handleClick} color="pending" variant="solid">
            Click me
          </Button>
          <Button size="middle" onClick={handleClick} color="error" variant="solid">
            Click me
          </Button>
          <Button size="middle" onClick={handleClick} color="neutral" variant="solid">
            Click me
          </Button>
        </div>
        <div className="flex gap-x-4">
          <Button icon="home" size="middle" onClick={handleClick} color="primary" variant="outline">
            Click me
          </Button>
          <Button
            icon="arrow-up-tray-solid"
            size="middle"
            onClick={handleClick}
            color="secondary"
            variant="outline"
          >
            Click me
          </Button>
          <Button size="middle" onClick={handleClick} color="success" variant="outline">
            Click me
          </Button>
          <Button size="middle" onClick={handleClick} color="pending" variant="outline">
            Click me
          </Button>
          <Button size="middle" onClick={handleClick} color="error" variant="outline">
            Click me
          </Button>
          <Button size="middle" onClick={handleClick} color="neutral" variant="outline">
            Click me
          </Button>
        </div>

        <div className="flex gap-x-4">
          <Button icon="home" size="middle" onClick={handleClick} color="primary" variant="subtle">
            Click me
          </Button>
          <Button size="middle" onClick={handleClick} color="secondary" variant="subtle">
            Click me
          </Button>
          <Button size="middle" onClick={handleClick} color="success" variant="subtle">
            Click me
          </Button>
          <Button size="middle" onClick={handleClick} color="pending" variant="subtle">
            Click me
          </Button>
          <Button size="middle" onClick={handleClick} color="error" variant="subtle">
            Click me
          </Button>
          <Button size="middle" onClick={handleClick} color="neutral" variant="subtle">
            Click me
          </Button>
        </div>

        <div className="flex gap-x-4">
          <Button icon="home" size="middle" onClick={handleClick} color="primary" variant="link">
            Click me
          </Button>
          <Button size="middle" onClick={handleClick} color="secondary" variant="link">
            Click me
          </Button>
          <Button size="middle" onClick={handleClick} color="success" variant="link">
            Click me
          </Button>
          <Button size="middle" onClick={handleClick} color="pending" variant="link">
            Click me
          </Button>
          <Button size="middle" onClick={handleClick} color="error" variant="link">
            Click me
          </Button>
          <Button size="middle" onClick={handleClick} color="neutral" variant="link">
            Click me
          </Button>
        </div>

        <div className="flex gap-x-4">
          <Button icon="home" size="middle" onClick={handleClick} color="primary" variant="text">
            Click me
          </Button>
          <Button size="middle" onClick={handleClick} color="secondary" variant="text">
            Click me
          </Button>
          <Button size="middle" onClick={handleClick} color="success" variant="text">
            Click me
          </Button>
          <Button size="middle" onClick={handleClick} color="pending" variant="text">
            Click me
          </Button>
          <Button size="middle" onClick={handleClick} color="error" variant="text">
            Click me
          </Button>
          <Button size="middle" onClick={handleClick} color="neutral" variant="text">
            Click me
          </Button>
        </div>

        <div className="flex gap-x-4">
          <Button icon="home" size="middle" onClick={handleClick} color="primary" variant="ghost">
            Click me
          </Button>
          <Button size="middle" onClick={handleClick} color="secondary" variant="ghost">
            Click me
          </Button>
          <Button size="middle" onClick={handleClick} color="success" variant="ghost">
            Click me
          </Button>
          <Button size="middle" onClick={handleClick} color="pending" variant="ghost">
            Click me
          </Button>
          <Button size="middle" onClick={handleClick} color="error" variant="ghost">
            Click me
          </Button>
          <Button size="middle" onClick={handleClick} color="neutral" variant="ghost">
            Click me
          </Button>
        </div>
        <div>
          <RenderIcon name="home" />
          <RenderIcon name="home-solid" />
        </div>

        {/* INPUT */}
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-row gap-x-4">
            <Input
              loading
              icon="home"
              size="small"
              onClick={handleClick}
              color="primary"
              variant="solid"
              label="Test"
              required
            />
            <Input
              iconRight="arrow-up-tray"
              size="middle"
              onClick={handleClick}
              color="secondary"
              variant="solid"
              label="Test"
              required
            />
            <Input
              icon="arrow-up-tray-solid"
              size="large"
              onClick={handleClick}
              color="success"
              variant="solid"
              label="Test"
              required
            />
            <Input size="middle" onClick={handleClick} color="pending" variant="solid" />
            <Input size="middle" onClick={handleClick} color="error" variant="solid" />
            <Input size="middle" onClick={handleClick} color="neutral" variant="solid" />
          </div>
          <div className="flex gap-x-4">
            <Input
              icon="home"
              size="middle"
              onClick={handleClick}
              color="primary"
              variant="outline"
            />
            <Input
              icon="arrow-up-tray-solid"
              size="middle"
              onClick={handleClick}
              color="secondary"
              variant="outline"
            />
            <Input size="middle" onClick={handleClick} color="success" variant="outline" />
            <Input size="middle" onClick={handleClick} color="pending" variant="outline" />
            <Input size="middle" onClick={handleClick} color="error" variant="outline" />
            <Input size="middle" onClick={handleClick} color="neutral" variant="outline" />
          </div>

          <div className="flex gap-x-4">
            <Input
              icon="home"
              size="middle"
              onClick={handleClick}
              color="primary"
              variant="subtle"
            />
            <Input size="middle" onClick={handleClick} color="secondary" variant="subtle" />
            <Input size="middle" onClick={handleClick} color="success" variant="subtle" />
            <Input size="middle" onClick={handleClick} color="pending" variant="subtle" />
            <Input size="middle" onClick={handleClick} color="error" variant="subtle" />
            <Input size="middle" onClick={handleClick} color="neutral" variant="subtle" />
          </div>

          <div className="flex gap-x-4">
            <Input
              icon="home"
              size="middle"
              onClick={handleClick}
              color="primary"
              variant="ghost"
            />
            <Input size="middle" onClick={handleClick} color="secondary" variant="ghost" />
            <Input size="middle" onClick={handleClick} color="success" variant="ghost" />
            <Input size="middle" onClick={handleClick} color="pending" variant="ghost" />
            <Input size="middle" onClick={handleClick} color="error" variant="ghost" />
            <Input size="middle" onClick={handleClick} color="neutral" variant="ghost" />
            <InputPassword size="middle" onClick={handleClick} color="neutral" variant="ghost" />
          </div>
        </div>
      </div>
    </>
  );
}
