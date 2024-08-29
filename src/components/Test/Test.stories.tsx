import type { Meta, StoryObj } from "@storybook/react";
import Test from ".";

const meta: Meta<typeof Test> = {
  title: "Components/Test",
  component: Test,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Test 컴포넌트는 Droppable과 Draggable 컴포넌트를 사용하여 드래그 앤 드롭 기능을 테스트할 수 있습니다.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Test>;

export const Default: Story = {};
