import { Button, Input } from '@/components/ui'
import type { ChannelConfig } from '@/types/channel'
import { LinkRegularIcon } from './ActionIcons'

interface ConnectionIntermediatePanelProps {
  channel: ChannelConfig
  accountName: string
  email: string
  onConnect: () => void
  onAccountNameChange: (value: string) => void
  onEmailChange: (value: string) => void
}

export function ConnectionIntermediatePanel({
  channel,
  accountName,
  email,
  onConnect,
  onAccountNameChange,
  onEmailChange,
}: ConnectionIntermediatePanelProps) {
  return (
    <section className="rounded-xl border border-[#e9eaeb] bg-white px-6 py-6 shadow-[0px_1px_2px_rgba(10,13,18,0.05)]">
      <h2 className="text-[18px] leading-[28px] font-semibold text-[#181d27]">Connect your {channel.name} account</h2>
      <p className="mt-1 text-[14px] leading-5 text-[#667085]">
        Complete these details and connect the account. Listings will be loaded after successful connection.
      </p>
      <div className="mt-6 grid grid-cols-1 gap-4">
        <div>
          <label className="text-[14px] leading-5 font-medium text-[#344054]">Account name</label>
          <Input value={accountName} onChange={(event) => onAccountNameChange(event.target.value)} className="mt-1" />
        </div>
        <div>
          <label className="text-[14px] leading-5 font-medium text-[#344054]">Account email</label>
          <Input value={email} onChange={(event) => onEmailChange(event.target.value)} className="mt-1" />
        </div>
      </div>
      <Button className="mt-6" onClick={onConnect}>
        <LinkRegularIcon className="w-5 h-5 mr-1.5" />
        Connect
      </Button>
    </section>
  )
}
