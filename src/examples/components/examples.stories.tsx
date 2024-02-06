import type { Meta, StoryObj } from '@storybook/react';
import { cn } from '@repo/utils';

import { CreateAccountDemo } from './create-account';
import { PaymentMethodDemo } from './payment-method';
import { CookieSettingsDemo } from './cookie-settings';
import { ReportAnIssueDemo } from './report-an-issue';
import { ShareDocumentDemo } from './share-document';
import { NotificationsDemo } from './notifications';
import { GithubCardDemo } from './github-card';
import { DatePickerCardDemo } from './date-picker-card';
import { ChatDemo } from './chat';
import { RecentSalesDemo } from './recent-sales';
import { ActivityGoalDemo } from './activity-goal';

const meta: Meta = {
  title: 'Examples/Examples',
};

export default meta;

export const Page: StoryObj = {
  render: CardsPageDemo,
};
export const CreateAccount: StoryObj = {
  render: CreateAccountDemo,
};
export const PaymentMethod: StoryObj = {
  render: PaymentMethodDemo,
};
export const CookieSettings: StoryObj = {
  render: CookieSettingsDemo,
};
export const ReportAnIssue: StoryObj = {
  render: ReportAnIssueDemo,
};
export const Chat: StoryObj = {
  render: ChatDemo,
};
export const RecentSales: StoryObj = {
  render: RecentSalesDemo,
};
export const ShareDocument: StoryObj = {
  render: ShareDocumentDemo,
};
export const Notifications: StoryObj = {
  render: NotificationsDemo,
};
export const GithubCard: StoryObj = {
  render: GithubCardDemo,
};
export const DatePickerCard: StoryObj = {
  render: DatePickerCardDemo,
};
export const ActivityGoal: StoryObj = {
  render: ActivityGoalDemo,
};

function DemoContainer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'mb-6 flex min-w-0 break-inside-avoid items-center justify-center [&>div]:w-full',
        className,
      )}
      {...props}
    />
  );
}

const demos = [
  ActivityGoalDemo,
  ReportAnIssueDemo,
  RecentSalesDemo,
  ShareDocumentDemo,
  PaymentMethodDemo,
  DatePickerCardDemo,
  NotificationsDemo,
  CreateAccountDemo,
  ChatDemo,
  GithubCardDemo,
  CookieSettingsDemo,
];

function CardsPageDemo() {
  return (
    <div className='@container'>
      <div className='@3xl:columns-2 @7xl:columns-3 gap-6 rounded-lg p-8'>
        {demos.map((Demo, i) => (
          <DemoContainer key={i}>
            <Demo />
          </DemoContainer>
        ))}
      </div>
    </div>
  );
}
