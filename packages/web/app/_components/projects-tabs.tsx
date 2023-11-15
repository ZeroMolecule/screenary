import { FC } from 'react';
import { Tabs, TabsList, TabsTab } from '@mantine/core';

export type TabOption = {
  value: string;
  label: string;
};

type Props = {
  defaultTab?: string;
  tabs: TabOption[];
  onChange: (value: string | null) => void;
};

export const ProjectsTabs: FC<Props> = ({ defaultTab, tabs, onChange }) => {
  const renderTab = ({ value, label }: TabOption) => (
    <TabsTab key={value} value={value}>
      {label}
    </TabsTab>
  );

  return (
    <Tabs value={defaultTab ?? tabs[0]?.value} onChange={onChange}>
      <TabsList>{tabs.map(renderTab)}</TabsList>
    </Tabs>
  );
};
