import * as TabsComponent from '@radix-ui/react-tabs';
import { ReactNode } from 'react';

const Tabs = TabsComponent.Root;
const TabsList = TabsComponent.List;

type TabProps = {
  value: string;
  children: ReactNode;
};

function Tab({ value, children, ...rest }: TabProps) {
  return (
    <TabsComponent.Trigger
      value={value}
      className="text-grayv2-600 hover:text-primaryv2-600 focus-visible:ring-primaryv2-500/40 data-[state=active]:border-primaryv2-600 data-[state=active]:text-primaryv2-600 flex h-[48px] cursor-pointer select-none items-center justify-center gap-2 rounded-lg rounded-b-none px-2 text-sm font-medium outline-none focus-visible:ring-2 data-[state=active]:border-b-2"
      {...rest}
    >
      {children}
    </TabsComponent.Trigger>
  );
}

function TabContent({ value, children, ...rest }: TabProps) {
  return (
    <TabsComponent.Content
      value={value}
      className="oveflow-auto -mx-8 px-8 pt-8 outline-none"
      {...rest}
    >
      {children}
    </TabsComponent.Content>
  );
}

export { Tabs, TabsList, Tab, TabContent };
