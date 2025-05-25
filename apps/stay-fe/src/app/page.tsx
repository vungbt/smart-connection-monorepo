'use client';
import { Button, Input, InputPassword, RenderIcon } from '@smart-connection-monorepo/ui-components';
export default function Index() {
  const handleClick = () => {
    console.log('Button clicked');
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen gap-y-7">
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
