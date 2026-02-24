interface ConnectionHelpSidebarProps {
  channelName: string
}

export function ConnectionHelpSidebar({ channelName }: ConnectionHelpSidebarProps) {
  return (
    <aside className="rounded-xl border border-[#e9eaeb] bg-white p-5 shadow-[0px_1px_2px_rgba(10,13,18,0.05)]">
      <h3 className="text-[16px] leading-6 font-semibold text-[#181d27]">Need help connecting?</h3>
      <p className="mt-2 text-[14px] leading-5 text-[#535862]">
        Make sure your {channelName} credentials are valid and that API access is enabled.
      </p>
      <ul className="mt-4 space-y-2 text-[14px] leading-5 text-[#535862]">
        <li>- Verify account permissions.</li>
        <li>- Confirm listings are visible in the channel.</li>
        <li>- Reconnect if credentials changed recently.</li>
      </ul>
    </aside>
  )
}
